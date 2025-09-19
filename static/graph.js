document.addEventListener('DOMContentLoaded', () => {
  // --- Skills ---
    const skills = [
    "Python", "R", "HTML", "CSS", "JavaScript", "Git", 
    "Machine Learning", "Data Analysis", "Microscopy", "PCR", "ELISA",
    "Flow Cytometry", "Protein Purification", "Public Speaking",
    "Project Management", "Team Leadership", "Communication", "Quality Control",
    "Teamwork", "PyTorch", "TensorFlow", "Conservation", "GMP", "Attention To Detail",
    "Science Communication", "Logistic Regression", "Critical Thinking",
    "Oncology", "Immunology", "Autoencoders", "Protein Structure", "Molecular Dynamics",
    "Steered Molecular Dynamics", "Single-Cell Analysis", "Neurology"
    ];


  // --- Experiences  ---
  const experiences = [
    {
      id: "iGEM",
      label: "iGEM",
      skills: ["Python", "HTML", "CSS", "JavaScript", "Teamwork", "PyTorch", "TensorFlow", "Conservation", "Project Management", "Git"],
      url: "https://2024.igem.wiki/unilausanne/"

    },
    {
      id: "Skånemejerier",
      label: "Quality Engineer Intern (Skånemejerier)",
      skills: ["Quality Control", "Communication", "GMP", "Attention To Detail"],
      url: "https://www.skanemejerier.se/"
    },
    {
      id: "Polypeptide",
      label: "Process Technician (Polypeptide)",
      skills: ["Protein Purification", "GMP"],
      url: "https://www.polypeptide.com/"
    },
    {
      id: "Synapse",
      label: "Vice-Chairperson (Synapse - Life Science Connect Sweden)",
      skills: ["Public Speaking", "Team Leadership", "Communication", "Project Management", "Teamwork"],
      url: "https://www.synapse-connect.org/"
    },
    {
      id: "MSc",
      label: "MSc Bioinformatics (UNIL)",
      skills: ["Machine Learning", "Python", "R", "Data Analysis", "Science Communication"],
      url: "https://www.unil.ch/fbm/en/home/menuinst/formation/biologie/masters/mls.html"
    },
    {
      id: "BSc",
      label: "BSc Biomedicine (Lund University)",
      skills: ["PCR", "ELISA", "Microscopy", "Flow Cytometry"],
      url: "https://www.lunduniversity.lu.se/lubas/i-uoh-lu-MGBIM"
    },
    {
      id: "Website",
      label: "Personal Website Project",
      skills: ["HTML", "CSS", "JavaScript", "Git"],
      url: "https://idaneinhardt.github.io/pages/home.html"
    },
    {
      id: "MScThesis",
      label: "MSc Thesis",
      skills: ["Machine Learning", "R", "Data Analysis", "Logistic Regression", "Critical Thinking", "Project Management", "Oncology", "Immunology"]
    },
    {
      id: "FSP",
      label: "First Step Project",
      skills: ["Machine Learning", "Python", "Data Analysis", "Autoencoders", "Project Management", "Protein Structure", "Molecular Dynamics", "Steered Molecular Dynamics"],
      url: "https://idaneinhardt.github.io/pages/projects/FSP.html"
    },
    {
      id: "BScThesis",
      label: "BSc Thesis",
      skills: ["Single-Cell Analysis", "R", "Data Analysis", "Oncology", "Neurology", "Science Communication"],
      url: "https://idaneinhardt.github.io/pages/projects/BScThesis.html"
    }
  ];

  // --- Build Cytoscape elements ---
  const elements = [];

  // Add skill nodes
  skills.forEach(skill => {
    elements.push({
      data: { id: `skill-${skill}`, label: skill, type: "skill" }
    });
  });

  // Add experience nodes and edges
  experiences.forEach(exp => {
  elements.push({
    data: { 
      id: `exp-${exp.id}`, 
      label: exp.label, 
      type: "experience", 
      url: exp.url || null,  // store link if it exists
      clickable: exp.url ? "true" : "false"
    }
  });

  exp.skills.forEach(skill => {
    elements.push({
      data: { source: `exp-${exp.id}`, target: `skill-${skill}` }
    });
  });
});


  // --- Initialize Cytoscape ---
  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: elements,
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'width': 70,
          'height': 70,
          'font-size': 12,
          'border-width': 2
        }
      },
      {
        selector: 'node[type="skill"]',
        style: {
          'background-color': '#b3dbd1',
          'border-color': '#7da49a',
          'shape': 'ellipse',
          'width': 80,
          'height': 80,
          'text-wrap': 'wrap',
          'text-max-width': 60,
          'font-size': 11
        }
      },
      {
        selector: 'node[type="experience"]',
        style: {
          'background-color': '#7da49a',
          'border-color': '#b3dbd1',
          'shape': 'round-rectangle',
          'width': 140,
          'height': 60,
          'text-wrap': 'wrap',
          'text-max-width': 120,
          'font-size': 11
        }
      },


      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#999',
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': '#999'
        }
      }
    ],
    layout: {
      name: 'cose',
      animate: true,
      idealEdgeLength: 150,
      nodeRepulsion: 3000
    },
    userZoomingEnabled: true,
    userPanningEnabled: true
  });

  // --- Reset button ---
  document.getElementById('resetBtn').addEventListener('click', () => {
    cy.layout({
      name: 'cose',
      animate: true,
      animationDuration: 800,
      idealEdgeLength: 150,
      nodeRepulsion: 3000
    }).run();
  });

  // Open link when clicking on a node with a URL
  cy.on('tap', 'node', evt => {
    const node = evt.target;
    const url = node.data('url');
    if (url) {
      window.open(url, '_blank'); // open in new tab
    }
  });
  
  // Change style on mouseover / mouseout
  cy.on('mouseover', 'node[type="experience"][clickable = "true"]', evt => {
    evt.target.style({
      'border-width': 6,
      'background-color': '#8fb29f'
    });
    document.body.style.cursor = 'pointer'; // change cursor globally
  });
  
  cy.on('mouseout', 'node[type="experience"][clickable = "true"]', evt => {
    evt.target.style({
      'border-width': 4,
      'background-color': '#7da49a',
      'font-weight': 'bold',
      'font-size': 13
    });
    document.body.style.cursor = 'default';
  });
});
