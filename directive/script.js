angular.module('app', ['controller'])
  .directive('treeSelection', [function() {
    return {
      restrict: 'E',
      scope: {
        levels: '='
      },
      templateUrl: 'tree-selection-template.html',
      controller: function($scope) {
        this.toggleCheckbox = function (level) {
          level.indeterminate = false;
          function determineSelected (elem) {
            if(elem === undefined) return;
            var allSet = true, allClear = true;
            if(elem.subLevel){
              var _break = false;
              angular.forEach(elem.subLevel, function (sl, idx){
                if (!_break) {
                  if(sl.indeterminate){
                    allClear = allSet = false;
                  }
                  else if(sl.selected){
                    allClear = false;
                  }
                  else{
                    allSet = false;
                  }
                  // stop if we don't need more work
                  if(!allClear && !allSet) _break = true;
                }
              });
              if(allSet){
                elem.selected = true;
                elem.indeterminate = false;
              }
              else if(allClear){
                elem.selected = false;
                elem.indeterminate = false;
              }
              else{
                elem.selected = false;
                elem.indeterminate = true;
              }
            }
            determineSelected(elem.parent);
          }

          function checkSubLevel (elem) {
            if(elem.subLevel === undefined) return;
            angular.forEach(elem.subLevel, function (sl, idx){
              sl.selected = elem.selected;
              sl.indeterminate = elem.indeterminate;
              checkSubLevel(sl);
            });
          }
          
          checkSubLevel(level);
          determineSelected(level);
        };
      }
    };
  }])
  .directive('treeLevel', [function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        level: '=',
        parent: '='
      },
      require: '^treeSelection',
      templateUrl: 'tree-level-template.html',
      link: function(scope, element, attrs, controller) {
        scope.toggleCheckbox = function () {
          controller.toggleCheckbox(scope.level);
        };
        scope.$watch('level.indeterminate', function(){
          angular.element(element).find('input')[0].indeterminate = scope.level.indeterminate;
        });
      }
    };
  }]);