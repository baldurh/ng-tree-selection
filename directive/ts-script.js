/**
 *  Angular Tree Selection Directive
 * 
 *  Version: 0.0.2
 *
 *  Author: Baldur Már Helgason <baldur.helgason@gmail.com>
 *
 */

angular.module('ng-tree-selection', [])
  .directive('treeSelection', [function() {
    return {
      restrict: 'E',
      scope: {
        tree: '=',
        parent: '='
      },
      template:  '<ul ng-show="!parent || parent.open">\
                    <li ng-repeat="l in tree" ng-class="{\'tree-leaf\': !l.subLevel}">\
                      <tree-level level="l" parent="parent"></tree-level>\
                    </li>\
                  </ul>',
      controller: function($scope) {

        this.toggleCheckbox = function (level) {
          // when checkbox is toggled it's either on or off
          level.indeterminate = false;
          
          checkSubLevel(level);
          determineSelected(level);
        };

        // changes the sub-tree
        function checkSubLevel (elem) {
          if(elem.subLevel === undefined) return;
          angular.forEach(elem.subLevel, function (sl, idx){
            sl.selected = elem.selected;
            sl.indeterminate = elem.indeterminate;
            checkSubLevel(sl);
          });
        }

        // traverses the parents to determine
        // the selection type
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
      require: '^treeSelection',
      link: function(scope, element, attrs, controller) {

        scope.level.parent = scope.parent;
        scope.level.selected = false;
        scope.level.indeterminate = false;

          var template =  '<i class="fa" ng-class="{true:\'fa-minus\', false:\'fa-plus\', undefined:\'fa-plus\'}[level.open]" ng-click="level.open = !level.open" ng-show="level.subLevel"></i>' +
                          '<div class="cb-wrapper">' +
                            '<input type="checkbox" value="None" id="{{$id}}" name="check" ng-model="level.selected" ng-change="toggleCheckbox()">' +
                            '<label ng-class="{\'ts-first-level\': !level.parent}" for="{{$id}}">' +
                          '</div>' +
                          '<span>{{level.text}}</span>';

        if (scope.level.subLevel) {
          template += '<tree-selection tree="level.subLevel" parent="level"></tree-selection>';
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