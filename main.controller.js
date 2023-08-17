angular.module("NarrowItDownApp").controller("NarrowItDownController",['$scope','$http',function($scope,$http){
    $scope.found=[];
    $scope.search=function(){
        $scope.array=[];
        $scope.s=false;
        $scope.show=false;
        $scope.val=document.getElementById("text").value;
        if($scope.val==""){
            $scope.show=true;
            $scope.ans="Nothing found";
        }
        else{
            $scope.s=true;
            $http({
                method: 'GET',
                url: 'info.json'
             })
             .then(function (response){
                $scope.file=response.data;
                $scope.result = $scope.file.filter(
                    function(item) {
                        if(item['description'].indexOf($scope.val)!=-1 || item['item'].indexOf($scope.val)!=-1){
                            $scope.array.push(item);
                        }
                    })
                    if($scope.array.length==0){
                        $scope.show=true;
                        $scope.ans="Nothing found";
                    }
             },
             function (error){
                console.error("Can't load ",error);
                $scope.file={ };
             });
        }
    }
    $scope.clear=function(index){
        $scope.array.splice(index,1);
    }
}])