import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { projectDetails } from '../data/projects';

// Transform project data into hierarchical structure for D3
const transformProjectData = () => {
  const children = Object.entries(projectDetails).map(([id, project]) => {
    const projectChildren = [];

    // Add role as a text node - make it large and prominent
    projectChildren.push({
      name: project.role,
      type: 'role',
      value: 80, // Larger value = bigger circle
    });

    // Add year as a text node
    projectChildren.push({
      name: project.year,
      type: 'year',
      value: 25,
    });

    // Add skills as text nodes
    if (project.skills) {
      project.skills.forEach((skill, i) => {
        projectChildren.push({
          name: skill,
          type: 'skill',
          value: 20 + (i % 3) * 5,
        });
      });
    }

    // Add gallery images as image nodes
    if (project.gallery && project.gallery.length > 0) {
      project.gallery.slice(0, 4).forEach((img, i) => {
        projectChildren.push({
          name: `${project.title} ${i + 1}`,
          type: 'image',
          image: img,
          value: 35 + (i % 2) * 10,
        });
      });
    }

    return {
      name: project.title,
      id: id,
      type: 'project',
      color: project.color,
      children: projectChildren,
    };
  });

  return {
    name: 'Portfolio',
    type: 'root',
    children,
  };
};

const CirclePacking = ({ width = 928, height = 928, onProjectClick }) => {
  const svgRef = useRef(null);
  const [focus, setFocus] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const data = transformProjectData();

    // Create color scale with dark theme
    const color = d3.scaleLinear()
      .domain([0, 3])
      .range(['hsl(270, 30%, 25%)', 'hsl(220, 40%, 15%)'])
      .interpolate(d3.interpolateHsl);

    // Create pack layout
    const pack = data => d3.pack()
      .size([width, height])
      .padding(3)
      (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value));

    const root = pack(data);
    let currentFocus = root;
    let currentView;

    // Clear existing
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .style('display', 'block')
      .style('background', '#0a0a0a')
      .style('cursor', 'pointer')
      .on('click', (event) => zoom(event, root));

    // Define clip paths for image circles
    const defs = svg.append('defs');

    root.descendants().forEach((d, i) => {
      if (d.data.type === 'image') {
        defs.append('clipPath')
          .attr('id', `clip-${i}`)
          .append('circle')
          .attr('r', d.r);
      }
    });

    // Create main group
    const g = svg.append('g');

    // Add circles
    const node = g.selectAll('g')
      .data(root.descendants().slice(1))
      .join('g')
      .attr('class', d => `node ${d.data.type}`)
      .style('cursor', d => d.children ? 'pointer' : 'default')
      .on('click', (event, d) => {
        if (d.children) {
          zoom(event, d);
        } else if (d.data.type === 'image' && onProjectClick) {
          // Find parent project
          let parent = d.parent;
          while (parent && parent.data.type !== 'project') {
            parent = parent.parent;
          }
          if (parent) {
            onProjectClick(parent.data.id);
          }
        }
        event.stopPropagation();
      });

    // Background circles
    node.append('circle')
      .attr('fill', d => {
        if (d.data.type === 'image') return 'none';
        if (d.data.type === 'project') return d.data.color || color(d.depth);
        if (d.data.type === 'role') return 'hsl(280, 50%, 22%)';
        if (d.data.type === 'skill') return 'hsl(220, 40%, 18%)';
        if (d.data.type === 'year') return 'hsl(200, 35%, 16%)';
        return d.children ? color(d.depth) : 'hsl(0, 0%, 12%)';
      })
      .attr('stroke', d => {
        if (d.data.type === 'project') return 'hsl(270, 50%, 40%)';
        if (d.data.type === 'role') return 'hsl(280, 60%, 50%)';
        if (d.data.type === 'image') return 'hsl(220, 30%, 30%)';
        return 'none';
      })
      .attr('stroke-width', d => {
        if (d.data.type === 'project') return 2;
        if (d.data.type === 'role') return 1.5;
        return 1;
      })
      .attr('r', d => d.r);

    // Add images for image nodes
    node.filter(d => d.data.type === 'image')
      .append('image')
      .attr('xlink:href', d => d.data.image)
      .attr('x', d => -d.r)
      .attr('y', d => -d.r)
      .attr('width', d => d.r * 2)
      .attr('height', d => d.r * 2)
      .attr('clip-path', (d, i) => {
        const idx = root.descendants().indexOf(d);
        return `url(#clip-${idx})`;
      })
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .style('opacity', 0.9);

    // Add border circle for images
    node.filter(d => d.data.type === 'image')
      .append('circle')
      .attr('fill', 'none')
      .attr('stroke', 'hsl(220, 30%, 35%)')
      .attr('stroke-width', 2)
      .attr('r', d => d.r);

    // Add labels using SVG text for reliable rendering
    const labelGroup = g.selectAll('.label-group')
      .data(root.descendants())
      .join('g')
      .attr('class', 'label-group');

    // Add text labels
    const label = labelGroup.append('text')
      .attr('class', 'label')
      .style('font-family', 'system-ui, -apple-system, sans-serif')
      .style('font-size', d => {
        if (d.data.type === 'project') return '16px';
        if (d.data.type === 'role') return '10px';
        return '8px';
      })
      .style('font-weight', d => {
        if (d.data.type === 'project') return '600';
        if (d.data.type === 'role') return '500';
        return '400';
      })
      .style('fill', d => {
        if (d.data.type === 'image') return 'transparent';
        if (d.data.type === 'role') return 'hsl(280, 80%, 85%)';
        if (d.data.type === 'year') return 'hsl(200, 60%, 75%)';
        if (d.data.type === 'skill') return 'hsl(220, 50%, 75%)';
        return 'hsl(0, 0%, 90%)';
      })
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .text(d => {
        if (d.data.type === 'image') return '';
        // Truncate long text
        const name = d.data.name;
        if (name.length > 20) return name.substring(0, 18) + '...';
        return name;
      });

    // Zoom function
    const zoomTo = (v) => {
      const k = width / v[2];
      currentView = v;

      labelGroup.attr('transform', d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);

      node.attr('transform', d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);

      node.select('circle')
        .attr('r', d => d.r * k);

      node.select('image')
        .attr('x', d => -d.r * k)
        .attr('y', d => -d.r * k)
        .attr('width', d => d.r * 2 * k)
        .attr('height', d => d.r * 2 * k);

      // Update clip paths
      defs.selectAll('clipPath circle')
        .attr('r', function() {
          const clipId = d3.select(this.parentNode).attr('id');
          const idx = parseInt(clipId.split('-')[1]);
          const d = root.descendants()[idx];
          return d ? d.r * k : 0;
        });

      // Show/hide labels based on zoom level and circle size
      labelGroup.select('text')
        .style('opacity', d => {
          if (d.data.type === 'image') return 0;
          // Always show project names
          if (d.data.type === 'project') return 1;
          // Show role labels when they're big enough
          if (d.data.type === 'role' && d.r * k > 30) return 1;
          // Show other labels when zoomed into parent or large enough
          if (d.parent === currentFocus) return 1;
          if (d === currentFocus) return 1;
          if (d.r * k > 25) return 0.8;
          return 0;
        })
        .style('font-size', d => {
          const baseSize = d.data.type === 'project' ? 16 : (d.data.type === 'role' ? 11 : 9);
          return `${Math.min(Math.max(baseSize * k * 0.1, 8), 32)}px`;
        });
    };

    const zoom = (event, d) => {
      currentFocus = d;
      setFocus(d);

      const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween('zoom', () => {
          const i = d3.interpolateZoom(currentView, [d.x, d.y, d.r * 2]);
          return t => zoomTo(i(t));
        });
    };

    // Initial view
    zoomTo([root.x, root.y, root.r * 2]);

  }, [width, height, onProjectClick]);

  return (
    <div style={{
      width: '100%',
      maxWidth: `${width}px`,
      margin: '0 auto',
      aspectRatio: '1',
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default CirclePacking;
