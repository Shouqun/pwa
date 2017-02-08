self.addEventListener('install', function(event) {
  console.log('SW installed');
});


self.addEventListener('activate', function(event){
  console.log('SW activate');
});
