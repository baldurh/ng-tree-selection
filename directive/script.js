angular.module('app', ['controller'])
  .directive('treeSelection', [function() {
    return {
      restrict: 'E',
      scope: {
        levels: '='
      },
      template: '<tree-level level="levels"></tree-level>',
      controller: function($scope) {
        this.levels = $scope.levels;
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
  .directive('treeLevel', ['$compile', function($compile) {
    return {
      restrict: 'E',
      scope: {
        level: '=',
        parent: '='
      },
      link: function (scope, element, attrs) {
        
        var template =  '<ul ng-show="!parent || parent.open">\
                          <li ng-repeat="l in level">\
                            <tree-line level="l" parent="parent"></tree-line>\
                          </li>\
                        </ul>';
        var newElement = angular.element(template);
        $compile(newElement)(scope);
        element.append(newElement);
      
      }
    };
  }])
  .directive('treeLine', ['$compile', function($compile) {
    return {
      restrict: 'E',
      scope: {
        level: '=',
        parent: '='
      },
      require: '^treeSelection',
      link: function(scope, element, attrs, controller) {
        scope.level.parent = scope.parent;
        var template =  '<i ng-init="level.selected = false; level.indeterminate = false;" class="fa" ng-class="{true:\'fa-minus-square-o\', false:\'fa-plus-square-o\', undefined:\'fa-plus-square-o\'}[level.open]" ng-click="level.open = !level.open" ng-show="level.subLevel"></i>\
                          <label class="tree-lvl-1">\
                            <input type="checkbox" ng-model="level.selected" ng-change="toggleCheckbox()">\
                            <span>{{level.text}}</span>\
                          </label>';
        if (scope.level.subLevel) {
          template += '<tree-level level="level.subLevel" parent="level"></tree-level>';
        }

        scope.toggleCheckbox = function () {
          controller.toggleCheckbox(scope.level);
        };
        

        var newElement = angular.element(template);
        $compile(newElement)(scope);
        element.append(newElement);

        scope.$watch('level.indeterminate', function(){
          angular.element(element).find('input')[0].indeterminate = scope.level.indeterminate;
        });
      }
    };
  }]);