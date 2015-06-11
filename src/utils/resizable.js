/**
 * Resizable directive
 * http://stackoverflow.com/questions/18368485/angular-js-resizable-div-directive
 * @param {object}
 * @param {function}
 * @param {function}
 */
export function Resizable($document, debounce, $timeout){
  return {
    restrict: 'AEC',
    scope:{
      isResizable: '=resizable',
      minWidth: '=',
      maxWidth: '=',
      onResize: '&'
    },
    link: function($scope, $element, $attrs){
      if($scope.isResizable){
        $element.addClass('resizable');
      }

      var handle = angular.element(`<span class="dt-resize-handle" title="Resize"></span>`),
          parent = $element.parent();

      handle.on('mousedown', function(event) {
        if(!$element[0].classList.contains('resizable')) {
          return false;
        }

        event.stopPropagation();
        event.preventDefault();

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        var width = parent[0].scrollWidth,
            newWidth = width + event.movementX;

        if((!$scope.minWidth || newWidth >= $scope.minWidth) && (!$scope.maxWidth || newWidth <= $scope.maxWidth)){
          parent.css({
            width: newWidth + 'px'
          });
        }
      }

      function mouseup() {
        if($scope.onResize){
          $timeout(() => {
            $scope.onResize({ width: parent[0].scrollWidth });
          });
        }

        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }

      $element.append(handle);
    }
  };
};
