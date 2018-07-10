const $ = require("jquery");

const apiController = Object.create({},{
    getMovies: {
        value: () => {
            return $.ajax("http://localhost:3000/Movies")
        }
    },
    saveMovie: {
        value:(param)=>{
            return $.ajax({
                url:"http://localhost:3000/Movies",
                type:"POST",
                data: {
                    name: param.name,
                    plot: param.plot,
                    duration: param.duration,
                    watched: param.watched
                }
            })
        }
    },
    deleteMovie:{
        value: function(id) {
            $.ajax({
                url: `http://localhost:3000/Movies/${id}`,
                type: "DELETE"
            })
        }
    },
    editMovie:{
        value: function(id, param) {
            return $.ajax({
                url:`http://localhost:3000/Movies/${id}`,
                type: "PUT",
                data:{
                    name: param.name,
                    plot: param.plot,
                    duration: param.duration,
                    watched: param.watched
                }
            })
        }
    }
})

module.exports = apiController;