$(document).ready(function() {
    // Class declarations

    function Article(subject, headline, date, page) {
        this.subject = subject;
        this.headline = headline;
        this.date = date;
        this.page = page;
        this.print = false;
        this.tableRow = function(currentRow) {
            var subjectName = this.subject;
            if(subjectName.length > 20) {
                subjectName = subjectName.substring(0,19) + '...';
            }
            var articleName = this.headline;
            if(articleName.length > 50) {
                articleName = articleName.substring(0, 49) + '...';
            }
            var string = '<tr><td>' + currentRow + '</td><td>' + subjectName + '</td><td>' + articleName + '</td><td>' + this.date + '</td><td>' + this.page + '</td><td><button type="button" class="btn btn-default btn-xs" data-article ="' + this + '">Add to Print</button></td></tr>';
            return string;
        }
    }

    function Obituary(lastname, firstname, birthdate, deathdate, obitdate, page) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthdate = birthdate;
        this.deathdate = deathdate;
        this.obitdate = obitdate;
        this.page = page;
        this.print = false;
    }

    function Wedding(lastname, firstname, announcement, weddingdate, articledate, page) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.announcement = announcement;
        this.weddingdate = weddingdate;
        this.articledate = articledate;
        this.page = page;
        this.print = false;
        this.tableRow = function() {
            var string = '';
        }
    }

    function ArticleList() {
        this.list = [];
        this.headers = ['Subject', 'Headline', 'Date', 'Page'];
        this.tableHead = function() {
            var string = '<p>' + this.list.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="header"> No.</th><th class="header"> Subject</th><th class="header"> Headline</th><th class="header"> Date</th><th class="header"> Page</th><td><button type="button" id="printAllArticles" class="btn btn-primary btn-xs">Print All</button></td></tr><thead><tbody>';
            return string;
        }
        this.tableFoot = '</tbody></table>';
    }

    function ObituaryList() {
        this.list = [];
        this.headers = ['Last Name', 'First Name', 'Birth Date', 'Death Date', 'Obituary Date', 'Page'];
    }

    function WeddingList() {
        this.list = [];
        this.headers = ['Last Name', 'First Name', 'Announcement', 'Wedding Date', 'Article Date', 'Page'];
    }
    
    function Item(subject, id) {
        this.subject = subject;
        this.id = id;
        this.added = false;
        this.card = function() {
            var string = '<span class="label subjectItem" id="' + this.id + '" data-subject="' + this.subject + '">' + this.subject + '</span>';
            return string;
        }
    }


    // Global Construction
    var articleList = new ArticleList();
    var obituaryList = new ObituaryList();
    var weddingList = new WeddingList();
    var items = [];

    function getItems() {
        $.ajax({
            url: "subjects.php",
            success: function(data) {
                var stuff = JSON.parse(data);
                for(x in stuff) {
                 //   var idString = stuff[x].subject.replace(/[^a-zA-Z0-9]/g, "");
                    var item = new Item(stuff[x].subject, 'a'+x+'a');
                    items.push(item);
                }
                createList();
            }
        });
    }
 /*   var items = [];
    var item1 = new Item("Library");
    var item2 = new Item("Accidents");
    var item3 = new Item("Deaths");
    var item4 = new Item("Darth");
    var item5 = new Item("Dan");
    items.push(item1, item2, item3, item4, item5);*/
    $("#subject").keyup(function() {
        //    debugger;
        if($(this).val() != "") {
            search($(this).val());
        } else {
            $("#notSelected").find(".subjectItem").hide();
        }
    });

    getItems();
    function search(searchterm) {
        var searched = items.filter(findElement);
        $("#notSelected").find(".subjectItem").hide();
        for(x in searched) {
            if(searched[x].added == false) {
                $("#notSelected").find("#"+searched[x].id).show();
            }
        }
        function findElement(input) {
            var uInput = input.subject.toUpperCase();
            var uSearchterm = searchterm.toUpperCase();
            return uInput.includes(uSearchterm);
        }
    }
    function createList() {
        var unselected = "";
        var selected = "";
/*       var searched = items.filter(findElement);
        for(x in searched) {
            if(searched[x].added == false) {
                unselected += searched[x].card();
            } else {
                selected += searched[x].card();
            }
        }*/
        for(x in items) {
            unselected += items[x].card();
            selected += items[x].card();
        }
        document.getElementById("notSelected").innerHTML = unselected;
        $("#notSelected").find(".subjectItem").addClass("label-default").hide();
        document.getElementById("isSelected").innerHTML = selected;
        $("#isSelected").find(".subjectItem").addClass("label-success").hide();
        document.getElementById("subjectList").innerHTML = selected;
        $("#subjectList").find(".subjectItem").addClass("label-success listItem").removeClass('subjectItem').hide();

    }
    function clearSubjects() {
        $("#subject").val("");
        items = [];
        getItems();
    }
    $("#clearSubjects").on('click',function() {
        $("#subject").val("");
        items = [];
        getItems();
    });
    $('body').on('click', '.subjectItem', function(data) {
        thisItemString = $(this).attr("data-subject");
        var thisItem = items.find(findItem);
        if(thisItem.added) {
            thisItem.added = false;
//         createList($("#subject").val());
            $(this).slideUp();
            $("#subjectList").find("#"+thisItem.id).slideUp();
            $("#notSelected").find("#"+thisItem.id).fadeIn();
        } else {
    //       debugger;
            thisItem.added = true;
            $(this).slideUp();
            $("#subjectList").find("#"+thisItem.id).fadeIn();
            $("#isSelected").find("#"+thisItem.id).fadeIn();
        //   $(this).remove();
        }
    // items.find(findItem).added = true;
        function findItem(item) {
        return item.subject == thisItemString;
    }
//   createList($("#subject").val());
    });
    $("#obitSearch").submit(function(event) {
        event.preventDefault();
        var firstName = $("#firstname").val();
        var lastName = $("#lastname").val();
        var searchType = $("#searchType").val();
        var data = {
            lastname: lastName,
            firstname: firstName,
            searchtype: searchType
        };
        $.ajax({
            type: 'GET',
            url: 'obits-search-api.php',
            dataType: 'json',
            data: data,
            success: function(data) {
                var list = [];
                if($("#searchType").val() == 'obituaries') {

                }
                if($("#searchType").val() == 'obituaries') {
                    var htmlString = '<p>' + data.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="header"> No.</th><th class="header"> Last Name</th><th class="header"> First Name</th><th class="header"> Birth Date</th><th class="header"> Death Date</th><th> Obituary Date</th><th> Page</th></tr><thead><tbody>';
                    var currentRow = 1;
                    for(x in data) {
                        htmlString += '<tr><td>' + currentRow + '</td><td>' + data[x].lastname + '</td><td>' + data[x].firstname + '</td><td>' + data[x].birthdate + '</td><td>' + data[x].deathdate + '</td><td>' + data[x].obitdate + '</td><td>' + data[x].page + '</td></tr>';
                        currentRow++;
                    }
                } else {
                    var htmlString = '<p>' + data.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="header"> No.</th><th class="header"> Last Name</th><th class="header"> First Name</th><th class="header"> Announcement</th><th class="header"> Wedding Date</th><th> Article Date</th><th> Page</th></tr><thead><tbody>';
                    var currentRow = 1;
                    for(x in data) {
                        htmlString += '<tr><td>' + currentRow + '</td><td>' + data[x].lastname + '</td><td>' + data[x].firstname + '</td><td>' + data[x].announcement + '</td><td>' + data[x].weddingdate + '</td><td>' + data[x].articledate + '</td><td>' + data[x].page + '</td></tr>';
                        currentRow++;
                    }
                }
                
                htmlString += '</tbody></table>';
                document.getElementById("resultsHere").innerHTML = htmlString;
                $("#resultsModal").modal('show');
                $("#myTable").tablesorter(); 
            },
            error: function(data) {
                window.alert("You must enter search criteria");
                /*debugger;
                window.alert("There was an error" + JSON.stringify(data));*/
            }
        });
    });
    $("#articleSearch").submit(function(event) {
        event.preventDefault();
        var thisHeadline = $("#headlineKeyword").val();
        var theseSubjects = [];
        var fromDate = $("#startyear").val();
        var toDate = $("#endyear").val();
        for(i in items) {
            if(items[i].added) {
                theseSubjects.push(items[i].subject);
            }
        }
        

    //    window.alert(theseSubjects);
    //   var subjectString = JSON.stringify(theseSubjects);
        var thisData = { 
            headline: thisHeadline,
            subjects: JSON.stringify(theseSubjects),
            fromDate: fromDate,
            toDate: toDate
        };
 //     window.alert(JSON.stringify(thisData));
        debugger;
        $.ajax({
            type: 'GET',
            url: 'news-search-api.php',
            dataType: 'json',
            data: thisData,
            success: function(data) {
                var htmlString = '';
                var currentRow = 1;
                var list = [];
                for(x in data) {
                    var article = new Article(data[x].subject, data[x].article, data[x].articledate, data[x].page);
                    list.push(article);
                    htmlString += article.tableRow(currentRow);
                    currentRow++;
                }
                articleList.list = list;
                htmlString = articleList.tableHead() + htmlString + articleList.tableFoot;
                document.getElementById("resultsHere").innerHTML = htmlString;
                $("#resultsModal").modal('show');
                $("#myTable").tablesorter();
            },
            error: function(data) {
                window.alert("You must enter search criteria");
               /* debugger;
                window.alert("There was an error" + JSON.stringify(data));*/
            }
        });
    });
    
    
});