angular.module('controller', [])
  .controller('TreeController', ['$scope', function ($scope) {
    $scope.data = {
      tree: [
        { 
          text: 'Number 1',
          open: true,
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
                },
                {
                  text: 'Number 1.1.4'
                },
                {
                  text: 'Number 1.1.5'
                },
                {
                  text: 'Number 1.1.6'
                },
                {
                  text: 'Number 1.1.7'
                }
              ]
            },
            { 
              text: 'Number 1.2',
              subLevel: [
                {
                  text: 'Number 1.2.1'
                },
                {
                  text: 'Number 1.2.2'
                },
                {
                  text: 'Number 1.2.3'
                },
                {
                  text: 'Number 1.2.4'
                },
                {
                  text: 'Number 1.2.5'
                },
                {
                  text: 'Number 1.2.6'
                },
                {
                  text: 'Number 1.2.7'
                },
                {
                  text: 'Number 1.2.8'
                }
              ]
            }
          ]
        },
        { 
          text: 'Number 2',
          subLevel: [
            { 
              text: 'Number 2.1'
            },
            { 
              text: 'Number 2.2',
              subLevel: [
                {
                  text: 'Number 2.2.1'
                },
                {
                  text: 'Number 2.2.2'
                },
                {
                  text: 'Number 2.2.3'
                },
                {
                  text: 'Number 2.2.4'
                }
              ]
            },
            { 
              text: 'Number 2.3',
              subLevel: [
                {
                  text: 'Number 2.3.1'
                },
                {
                  text: 'Number 2.3.2'
                },
                {
                  text: 'Number 2.3.3'
                },
                {
                  text: 'Number 2.3.4'
                },
                {
                  text: 'Number 2.3.5'
                },
                {
                  text: 'Number 2.3.6'
                },
                {
                  text: 'Number 2.3.7'
                },
                {
                  text: 'Number 2.3.8'
                }
              ]
            }
          ]
        },
        { 
          text: 'Number 3',
          subLevel: [
            { 
              text: 'Number 3.1',
              subLevel: [
                {
                  text: 'Number 3.1.1'
                },
                {
                  text: 'Number 3.1.2'
                }
              ]
            },
            { 
              text: 'Number 3.2',
              subLevel: [
                {
                  text: 'Number 3.2.1'
                },
                {
                  text: 'Number 3.2.2'
                },
                {
                  text: 'Number 3.2.3'
                },
                {
                  text: 'Number 3.2.4'
                }
              ]
            },
            { 
              text: 'Number 3.3',
              subLevel: [
                {
                  text: 'Number 3.3.1'
                },
                {
                  text: 'Number 3.3.2'
                },
                {
                  text: 'Number 3.3.3'
                },
                {
                  text: 'Number 3.3.4'
                },
                {
                  text: 'Number 3.3.5',
                  subLevel: [
                    {
                      text: 'Number 3.3.5.1',
                      subLevel: [
                        {
                          text: 'Number 3.3.5.1.1'
                        }
                      ]
                    },
                    {
                      text: 'Number 3.3.5.2'
                    }
                  ]
                },
                {
                  text: 'Number 3.3.6'
                },
                {
                  text: 'Number 3.3.7'
                },
                {
                  text: 'Number 3.3.8'
                }
              ]
            }
          ]
        }
      ]};
  }]);