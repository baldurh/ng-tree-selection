angular-tree-selection-directive
================================

See controller.js for how the tree object should be formed.
```
tree = [
  {
    text: 'Number 1',
    open: true, /* optional */
    subLevel: [
      { 
        text: 'Number 1.1',
        subLevel: [
          {
            text: 'Number 1.1.1'
          },
          {
            text: 'Number 1.1.2',
            subLevel: [
              {
                text: 'Number 1.1.2.1'
              },
              {
                text: 'Number 1.1.2.2'
              }
            ]
          },
          {
            text: 'Number 1.1.3'
          }
        ]
      }
    ]
  },
  {
    text: 'Number 2',
    subLevel: [
      { 
        text: 'Number 2.1',
        subLevel: [
          {
            text: 'Number 2.1.1'
          },
          {
            text: 'Number 2.1.2',
          }
        ]
      }
    ]
  }
];
```