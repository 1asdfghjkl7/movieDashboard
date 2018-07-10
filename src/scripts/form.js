const $ = require("jquery");
const $wrapper = $("#wrapper");
const apiController = require("apiController");

const formObject = Object.create({}, {
    form: {
        value: () => {
            $wrapper.empty();
            const nameInput = $("<input>").attr("placeholder","Name of Movie").appendTo($wrapper)
            const plotInput = $("<input>").attr("placeholder","Plot Summary").appendTo($wrapper)
            const durationInput = $("<input>").attr("placeholder","Duration").appendTo($wrapper)
            $("<button>").text("Save Movie").appendTo($wrapper).click(()=>{
                const movieDataObject = {
                    name: nameInput.val(),
                    plot: plotInput.val(),
                    duration: durationInput.val(),
                    watched: false
                }
                apiController.saveMovie(movieDataObject).then((r)=>{
                    $wrapper.empty()
                    formObject.dashboard()
                }
                )
            })
        }
    },
    dashboard: {
        value: () => {
            formObject.printMovies()
            $("<button>").text("New Movie").appendTo($wrapper).click(formObject.form);
        }
    },
    printMovies: {
        value: () => {apiController.getMovies().then((response)=>{
            // console.log(response);
            response.forEach(element => {
                console.log(element);
                // const $columns = $("<div>").addClass("columns").appendTo($wrapper);
                if (element.watched === "false") {
                    const $div = $("<div>").addClass("card column").appendTo($wrapper);
                    const $p = $("<p>").text("Complete: ").attr("id","explain-checkbox").appendTo($div)
                    for (const key in element) {
                        console.log(element);
                        if (key === "name" && element.watched === "false") {$("<p>").text(`${element[key]}`).appendTo($div);
                        const editBtn = $("<button>").addClass("button is-small is-info edit").text("Edit").appendTo($div).click(()=>{
                            // console.log($(event.target).siblings().eq(2))
                            // targets element.desc and "replaces" it with an input field filled with the value of it
                            const $replacementName = $("<input>").attr("value",element.name)
                            $(event.target).siblings().eq(1).replaceWith($replacementName)
                            const $replacementPlot = $("<input>").attr("value",element.plot)
                            $(event.target).siblings().eq(2).replaceWith($replacementPlot)
                            const $replacementDuration = $("<input>").attr("value",element.duration)
                            $(event.target).siblings().eq(3).replaceWith($replacementDuration)
                            // console.log($(event.target).siblings().eq(2))
                            if ($(event.target).siblings().eq(1).is("input") || $(event.target).siblings().eq(2).is("input") || $(event.target).siblings().eq(3).is("input")) {
                                $(event.target).siblings().eq(1).keypress((e)=>{
                                    if (e.which === 13) {
                                        const editBtnUpdateObj = {
                                            name: $replacementName.val(),
                                            plot: $replacementPlot.val(),
                                            duration: $replacementDuration.val(),
                                            watched: false
                                        }
                                        apiController.editMovie(element.id,editBtnUpdateObj).then((response)=>{
                                            $wrapper.empty()
                                            formObject.dashboard()
                                        })
                                    }
                                })
                                $(event.target).siblings().eq(2).keypress((e)=>{
                                    if (e.which === 13) {
                                        const editBtnUpdateObj = {
                                            name: $replacementName.val(),
                                            plot: $replacementPlot.val(),
                                            duration: $replacementDuration.val(),
                                            watched: false
                                        }
                                        apiController.editMovie(element.id,editBtnUpdateObj).then((response)=>{
                                            $wrapper.empty()
                                            formObject.dashboard()
                                        })
                                    }
                                })
                                $(event.target).siblings().eq(3).keypress((e)=>{
                                    if (e.which === 13) {
                                        const editBtnUpdateObj = {
                                            name: $replacementName.val(),
                                            plot: $replacementPlot.val(),
                                            duration: $replacementDuration.val(),
                                            watched: false
                                        }
                                        apiController.editMovie(element.id,editBtnUpdateObj).then((response)=>{
                                            $wrapper.empty()
                                            formObject.dashboard()
                                        })
                                    }
                                })
                            }
                        })
                        }
                        else if (key === "plot" && element.watched === "false") {$("<p>").text(`${element[key]}`).addClass("due-date").appendTo($div);
                        // console.log(element[key]);
                    }
                        else if (key === "duration" && element.watched === "false") {$("<p>").text(`${element[key]}`).addClass("due-date").appendTo($div);}
                }
                    const $checkbox = $("<input>").addClass("checkbox").attr("type","checkbox").appendTo($p).click(()=>{
                        const checkboxDbUpdate = {
                            name: element.name,
                            plot: element.plot,
                            duration: element.duration,
                            watched: "true"
                        }
                        apiController.editMovie(element.id,checkboxDbUpdate).then((response)=>{
                        $div.empty()
                        $wrapper.empty()
                        formObject.dashboard()
                    })
                    })
                    $deleteBtn = $("<button>").addClass("button is-medium is-danger delete").text("").appendTo($div).click((e)=>{
                        apiController.deleteMovie(element.id);
                        $(e.target.parentNode).remove();
                        // console.log(e.target.parentNode);
                        // console.log(element.id);
                    })
                }
            })
            // const buildFormBtn = $("<button>").addClass("add-task").text("+").appendTo($wrapper).click(()=>{
            //     const $buildFormDiv = $("<div>").appendTo($wrapper)
            //     const descInput = $("<input>").attr("placeholder","description").appendTo($buildFormDiv)
            //     const dueDateInput = $("<input>").attr("type","date").attr("placeholder","due").appendTo($buildFormDiv)
            //     buildFormBtn.hide();
            //     const $subBtn = $("<button>").text("Submit").appendTo($buildFormDiv).click(()=>{
            //         $wrapper.empty()
            //         const miniTaskObject = {
            //             userId: sessionStorage.getItem("activeUser"),
            //             dueDate: dueDateInput.val(),
            //             taskDescription: descInput.val(),
            //             complete: "false"
            //         }
            //         apiController.addNewTask(miniTaskObject)
            //         taskObject.printTasks()
            //         $buildFormDiv.hide()
            //         buildFormBtn.show()
            //         $subBtn.show();
            //     })
            // })
        })}
    }
})

module.exports = formObject;