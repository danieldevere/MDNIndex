$(document).ready(function() {
    // Class declarations

    function Article(subject, headline, date, page, id) {
        this.type = 'article';
        this.subject = subject;
        this.headline = headline;
        this.date = date;
        this.page = page;
        this.print = false;
        this.id = id;
        this.tableRow = function(currentRow) {
            var subjectName = this.subject;
            if(subjectName.length > 20) {
                subjectName = subjectName.substring(0,19) + '...';
            }
            var articleName = this.headline;
            if(articleName.length > 50) {
                articleName = articleName.substring(0, 49) + '...';
            }
            var string = '<tr><td>' + currentRow + '</td><td>' + subjectName + '</td><td>' + articleName + '</td><td>' + this.date + '</td><td>' + this.page + '</td><td><button type="button" class="print btn btn-default btn-xs" data-type="article" id="' + this.id + '">Add to Print</button></td></tr>';
            return string;
        }
    }

    function Obituary(lastname, firstname, birthdate, deathdate, obitdate, page, id) {
        this.type = 'obituary';
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthdate = birthdate;
        this.deathdate = deathdate;
        this.obitdate = obitdate;
        this.page = page;
        this.print = false;
        this.id = id;
        this.tableRow = function(currentRow) {
            var string = '<tr><td>' + currentRow + '</td><td>' + this.lastname + '</td><td>' + this.firstname + '</td><td>' + this.birthdate + '</td><td>' + this.deathdate + '</td><td>' + this.obitdate + '</td><td>' + this.page + '</td><td><button type="button" class="print btn btn-default btn-xs" data-type="obituary" id="' + this.id + '">Add to Print</button></td></tr>';
            return string;        
        }
    }

    function Wedding(lastname, firstname, announcement, weddingdate, articledate, page, id) {
        this.type = 'wedding';
        this.lastname = lastname;
        this.firstname = firstname;
        this.announcement = announcement;
        this.weddingdate = weddingdate;
        this.articledate = articledate;
        this.page = page;
        this.print = false;
        this.id = id;
        this.tableRow = function(currentRow) {
            var string = '<tr><td>' + currentRow + '</td><td>' + this.lastname + '</td><td>' + this.firstname + '</td><td>' + this.announcement + '</td><td>' + this.weddingdate + '</td><td>' + this.articledate + '</td><td>' + this.page + '</td><td><button type="button" class="print btn btn-default btn-xs" data-type="wedding" id="' + this.id + '">Add to Print</button></td></tr>';
            return string;          
        }
    }

    function ArticleList() {
        this.list = [];
        this.headers = ['Subject', 'Headline', 'Date', 'Page'];
        this.tableHead = function() {
            var string = '<p>' + this.list.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="sort"> No.</th><th class="sort"> Subject</th><th class="sort"> Headline</th><th class="sort"> Date</th><th class="sort"> Page</th><td class="sorter-false"><button type="button" id="printAllArticles" class="btn btn-primary btn-xs">Print All</button></td></tr></thead><tbody>';
            return string;
        }
        this.tableFoot = '</tbody></table>';
    }

    function ObituaryList() {
        this.list = [];
        this.headers = ['Last Name', 'First Name', 'Birth Date', 'Death Date', 'Obituary Date', 'Page'];
        this.tableHead = function() {
            var string = '<p>' + this.list.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="sort"> No.</th><th class="sort"> Last Name</th><th class="sort"> First Name</th><th class="sort"> Birth Date</th><th class="sort"> Death Date</th><th class="sort"> Obituary Date</th><th> Page</th><td class="sorter-false"><button type="button" id="printAllObits" class="btn btn-primary btn-xs">Print All</button></td></tr></thead><tbody>';
            return string;                     
        }
        this.tableFoot = '</tbody></table>';
    }

    function WeddingList() {
        this.list = [];
        this.headers = ['Last Name', 'First Name', 'Announcement', 'Wedding Date', 'Article Date', 'Page'];
        this.tableHead = function() {
            var string = '<p>' + this.list.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="sort"> No.</th><th class="sort"> Last Name</th><th class="sort"> First Name</th><th class="sort"> Announcement</th><th class="sort"> Wedding Date</th><th> Article Date</th><th> Page</th><td class="sorter-false"><button type="button" class="btn btn-primary btn-xs" id="printAllWeddings">Print All</button></td></tr></thead><tbody>';
            return string;       
        }
        this.tableFoot = '</tbody></table>';
    }

    function PrintList() {
        this.articleList = [];
        this.obituaryList = [];
        this.weddingList = [];
        this.hasItems = function() {
            if(this.articleList.length > 0 || this.weddingList.length > 0 || this.obituaryList.length > 0) {
                return true;
            } else {
                return false;
            }
        }
        this.addPrint = function(item) {
            this.hasItems = true;
            if(item.type == 'article') {
                this.articleList.push(item);
            } else if(item.type == 'obituary') {
                this.obituaryList.push(item);
            } else {
                this.weddingList.push(item);
            }
        }
        this.clearPrints = function() {
            this.hasItems = false;
            this.articleList = [];
            this.obituaryList = [];
            this.weddingList = [];
        }
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
    var printList = new PrintList();
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

    // Event Listeners

    $("#printButton").click(function() {
        if(printList.hasItems) {
            var articleDataTest = [
                {
                    subject: 'Library',
                    headline: 'Library',
                    date: '01/01/1990',
                    page: 'A1'
                }
            ];
            document.getElementById("articleData").value = JSON.stringify(printList.articleList);
            document.getElementById("obituaryData").value = JSON.stringify(printList.obituaryList);
            document.getElementById("weddingData").value = JSON.stringify(printList.weddingList);
      //      window.alert(JSON.stringify(printList.obituaryList));
            $("#printForm").submit();

        }
    });
    $("#resultsHere").on('click','.print:enabled', function() {
        var addedPrint = $(this);
        if(addedPrint.data('type') == 'article') {
            var item = articleList.list[addedPrint.attr('id')];
            printList.articleList.push(item);
        } else if(addedPrint.data('type') == 'obituary') {
            var item = obituaryList.list[addedPrint.attr('id')];
            printList.obituaryList.push(item);
        } else {
            var item = weddingList.list[addedPrint.attr('id')];
            printList.weddingList.push(item);            
        }
        addedPrint.addClass("disabled");
    });
    $("#resultsHere").on('click', '#printAllObits:enabled', function(){
        printList.obituaryList = printList.obituaryList.concat(obituaryList.list);
        $(this).addClass('disabled');
        $('.print').addClass('disabled');
    });
    $("#resultsHere").on('click', '#printAllArticles:enabled', function(){
        printList.articleList = printList.articleList.concat(articleList.list);
        $(this).addClass('disabled');
        $('.print').addClass('disabled');        
    });
    $("#resultsHere").on('click', '#printAllWeddings:enabled', function(){
        printList.weddingList = printList.weddingList.concat(weddingList.list);
        $(this).addClass('disabled');
        $('.print').addClass('disabled');        
    });

    $("#subject").keyup(function() {
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
                var currentRow = 1;
                var htmlString = '';
                if($("#searchType").val() == 'obituaries') {
                    for(x in data) {
                        var obituary = new Obituary(data[x].lastname, data[x].firstname, data[x].birthdate, data[x].deathdate, data[x].obitdate, data[x].page, x);
                        list.push(obituary);
                        htmlString += obituary.tableRow(currentRow);
                        currentRow++;
                    }
                    obituaryList.list = list;
                    htmlString = obituaryList.tableHead() + htmlString + obituary.tableFoot;
                } else {
                    for(x in data) {
                        var wedding = new Wedding(data[x].lastname, data[x].firstname, data[x].announcement, data[x].weddingdate, data[x].articledate, data[x].page, x);
                        list.push(wedding);
                        htmlString += wedding.tableRow(currentRow);
                        currentRow++;
                    }
                    weddingList.list = list;
                    htmlString = weddingList.tableHead() + htmlString + weddingList.tableFoot;
                }
/*                if($("#searchType").val() == 'obituaries') {
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
                
                htmlString += '</tbody></table>';*/
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
    //    debugger;
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
                    var article = new Article(data[x].subject, data[x].article, data[x].articledate, data[x].page, x);
                    list.push(article);
                    htmlString += article.tableRow(currentRow);
                    currentRow++;
                }
                articleList.list = list;
                htmlString = articleList.tableHead() + htmlString + articleList.tableFoot;
                document.getElementById("resultsHere").innerHTML = htmlString;
                $("#resultsModal").modal('show');
                $("#myTable").tablesorter({
                    headers: {
                        '.printAll' : {
                            sorter: false
                        }
                    }
                });
            },
            error: function(data) {
                window.alert("You must enter search criteria");
               /* debugger;
                window.alert("There was an error" + JSON.stringify(data));*/
            }
        });
    });
    
    
});