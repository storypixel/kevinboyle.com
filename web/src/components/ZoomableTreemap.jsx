import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { projectDetails } from '../data/projects';

// Transform project data into hierarchical structure
const transformProjectData = () => {
  const children = Object.entries(projectDetails).map(([id, project]) => {
    const projectChildren = [];

    // Add role as a prominent node with blurb
    projectChildren.push({
      name: project.role,
      type: 'role',
      blurb: project.roleBlurb,
      value: 180,
    });

    // Add skills
    if (project.skills) {
      project.skills.forEach((skill) => {
        projectChildren.push({
          name: skill,
          type: 'skill',
          value: 50,
        });
      });
    }

    // Add gallery images
    if (project.gallery && project.gallery.length > 0) {
      project.gallery.slice(0, 4).forEach((img, i) => {
        projectChildren.push({
          name: `Work ${i + 1}`,
          type: 'image',
          image: img,
          value: 90,
        });
      });
    }

    // Add year
    projectChildren.push({
      name: project.year,
      type: 'year',
      value: 40,
    });

    return {
      name: project.title,
      id: id,
      type: 'project',
      children: projectChildren,
    };
  });

  return {
    name: 'Portfolio',
    type: 'root',
    children,
  };
};

const ZoomableTreemap = ({ onProjectClick }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const data = transformProjectData();

    // Color scale for projects
    const projectColors = {
      radius: '#4a3f6b',
      textline: '#3d5a80',
      mozeo: '#5c3d6e',
      textedly: '#3a6b8c',
      crypto: '#6b3d5c',
    };

    const getColor = (d) => {
      if (d.data.type === 'project') return projectColors[d.data.id] || '#4a4a6a';
      if (d.data.type === 'role') return '#7c5295';
      if (d.data.type === 'skill') return '#4a6a8a';
      if (d.data.type === 'year') return '#5a7a8a';
      if (d.data.type === 'image') return '#2a2a3a';
      return '#3a3a4a';
    };

    // Clear container
    d3.select(container).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', '100%')
      .style('font-family', 'system-ui, sans-serif');

    let g = svg.append('g');

    // Track state
    let currentRoot = null;

    // Position scales
    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);

    // Create treemap layout function
    const tile = (node, x0, y0, x1, y1) => {
      d3.treemapBinary(node, 0, 0, width, height);
      for (const child of node.children) {
        child.x0 = x0 + child.x0 / width * (x1 - x0);
        child.x1 = x0 + child.x1 / width * (x1 - x0);
        child.y0 = y0 + child.y0 / height * (y1 - y0);
        child.y1 = y0 + child.y1 / height * (y1 - y0);
      }
    };

    const treemap = data => d3.treemap()
      .tile(tile)
      .size([width, height])
      .paddingOuter(6)
      .paddingTop(28)
      .paddingInner(4)
      .round(true)
      (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value));

    const root = treemap(data);

    // Render function
    const render = (group, rootNode) => {
      const node = group
        .selectAll('g')
        .data(rootNode.children.concat(rootNode))
        .join('g');

      node.filter(d => d === rootNode ? d.parent : d.children)
        .attr('cursor', 'pointer')
        .on('click', (event, d) => {
          if (d === rootNode) {
            zoomout(rootNode);
          } else {
            zoomin(d);
          }
        });

      // Add rectangles
      node.append('rect')
        .attr('id', d => (d.leafUid = `leaf-${Math.random().toString(36).substr(2, 9)}`).slice(5))
        .attr('fill', d => d === rootNode ? '#0a0a14' : getColor(d))
        .attr('stroke', d => d === rootNode ? 'none' : '#1a1a2a')
        .attr('stroke-width', 2)
        .attr('rx', 6);

      // Clip paths
      node.append('clipPath')
        .attr('id', d => (d.clipUid = `clip-${Math.random().toString(36).substr(2, 9)}`).slice(5))
        .append('use')
        .attr('xlink:href', d => `#${d.leafUid}`);

      // Add images for image nodes
      node.filter(d => d.data.type === 'image' && d.data.image)
        .append('image')
        .attr('clip-path', d => `url(#${d.clipUid})`)
        .attr('xlink:href', d => d.data.image)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .style('opacity', 0.85);

      // Add titles
      node.append('text')
        .attr('clip-path', d => `url(#${d.clipUid})`)
        .attr('x', 10)
        .attr('y', 22)
        .attr('fill', d => {
          if (d === rootNode) return '#f0f0f8';
          if (d.data.type === 'role') return '#e8b4f8';
          if (d.data.type === 'year') return '#8ecae6';
          if (d.data.type === 'skill') return '#a5c4d4';
          if (d.data.type === 'image') return 'transparent';
          return '#f0f0f8';
        })
        .attr('font-size', d => {
          if (d === rootNode) return '18px';
          if (d.data.type === 'project') return '16px';
          if (d.data.type === 'role') return '15px';
          return '12px';
        })
        .attr('font-weight', d => (d === rootNode || d.data.type === 'project' || d.data.type === 'role') ? '600' : '400')
        .style('pointer-events', 'none')
        .text(d => d.data.type === 'image' ? '' : d.data.name);

      // Add role blurbs
      node.filter(d => d.data.type === 'role' && d.data.blurb)
        .append('foreignObject')
        .attr('clip-path', d => `url(#${d.clipUid})`)
        .attr('x', 10)
        .attr('y', 42)
        .style('pointer-events', 'none')
        .append('xhtml:div')
        .style('font-size', '13px')
        .style('line-height', '1.5')
        .style('color', '#c8b8d8')
        .style('padding-right', '10px')
        .text(d => d.data.blurb);

      // Position elements
      group.call(position, rootNode);
    };

    // Position function with transition
    const position = (group, rootNode) => {
      group.selectAll('g')
        .attr('transform', d => d === rootNode ? 'translate(0,-30)' : `translate(${x(d.x0)},${y(d.y0)})`)
        .select('rect')
        .attr('width', d => d === rootNode ? width : x(d.x1) - x(d.x0))
        .attr('height', d => d === rootNode ? 30 : y(d.y1) - y(d.y0));

      group.selectAll('g')
        .select('image')
        .attr('width', d => x(d.x1) - x(d.x0))
        .attr('height', d => y(d.y1) - y(d.y0));

      group.selectAll('g')
        .select('foreignObject')
        .attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 20))
        .attr('height', d => Math.max(0, y(d.y1) - y(d.y0) - 55));
    };

    // Zoom in - old view scales up/out, new view fades in and scales to fill
    const zoomin = (d) => {
      const group0 = g.attr('pointer-events', 'none');
      const group1 = g = svg.append('g').call(render, d);

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      svg.transition()
        .duration(750)
        .ease(d3.easeCubicInOut)
        .call(t => group0.transition(t).remove()
          .call(position, d.parent))
        .call(t => group1.transition(t)
          .attrTween('opacity', () => d3.interpolate(0, 1))
          .call(position, d));

      currentRoot = d;
      updateBackButton(true);
      backBtn.raise();
    };

    // Zoom out - current view fades and shrinks, parent view scales to normal
    const zoomout = (d) => {
      const group0 = g.attr('pointer-events', 'none');
      const group1 = g = svg.insert('g', '*').call(render, d.parent);

      x.domain([d.parent.x0, d.parent.x1]);
      y.domain([d.parent.y0, d.parent.y1]);

      svg.transition()
        .duration(750)
        .ease(d3.easeCubicInOut)
        .call(t => group0.transition(t).remove()
          .attrTween('opacity', () => d3.interpolate(1, 0))
          .call(position, d))
        .call(t => group1.transition(t)
          .call(position, d.parent));

      currentRoot = d.parent === root ? null : d.parent;
      updateBackButton(d.parent !== root);
      backBtn.raise();
    };

    // Back button - minimal style positioned below nav
    const backBtn = svg.append('g')
      .attr('class', 'back-btn')
      .attr('transform', 'translate(40, 70)')
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .style('pointer-events', 'none')
      .on('click', (event) => {
        event.stopPropagation();
        if (currentRoot && currentRoot.parent) {
          zoomout(currentRoot);
        }
      });

    backBtn.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'var(--text-secondary, #888)')
      .attr('font-size', '14px')
      .attr('font-weight', '400')
      .attr('font-family', 'Inter, -apple-system, sans-serif')
      .style('transition', 'fill 0.2s ease')
      .text('← Back')
      .on('mouseenter', function() { d3.select(this).attr('fill', 'var(--text-color, #fff)'); })
      .on('mouseleave', function() { d3.select(this).attr('fill', 'var(--text-secondary, #888)'); });

    const updateBackButton = (show) => {
      backBtn
        .transition()
        .duration(300)
        .style('opacity', show ? 1 : 0)
        .style('pointer-events', show ? 'all' : 'none');
    };

    // Initial render
    x.domain([root.x0, root.x1]);
    y.domain([root.y0, root.y1]);
    g.call(render, root);
    backBtn.raise(); // Ensure back button is on top

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      svg.attr('viewBox', [0, 0, newWidth, newHeight]);
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();

  }, [onProjectClick]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#0a0a14',
      }}
    />
  );
};

export default ZoomableTreemap;
