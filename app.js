var app = new Vue({
  el: "#app",

  created: function() {
    console.log('%cHello Thelevel9', 'color: blue;font-weight:bold;');
    console.log('%cO src está no github...', 'color: red;font-style: italic;');
  },

  data: {
    data: [],
    error: false,
    user: "",
    sortState: 1
  },

  methods: {
    sortByLang: e => {
      var z = app.sortState,
        w = +!z;
      app.sortState = w;
      return (app.data = app.data.sort(function(a, b) {
        var x = a.language,
          y = b.language;
        return !w ? (x > y ? -1 : x < y ? 1 : 0) : x < y ? -1 : x > y ? 1 : 0;
      }));
    },
    searchUser: e => {
      console.log("searching...");
      app.error = false;
      if (!app.user) return (app.error = true);
      axios
        .get(`https://api.github.com/users/${app.user}/repos`, {
          crossdomain: true
        })
        .then(response => {
          app.data = response.data;
          app.sortByLang();
          console.log(response.data);
        })
        .catch(err => {
          app.error = true;
          app.data = [];
        });
      return true;
    }
  }
  
});
