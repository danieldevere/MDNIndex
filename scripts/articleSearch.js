/*// Article Class
    function Article(subject, headline, date, page, id) {
        this.type = 'article';
        this.subject = subject;
        this.headline = headline;
        this.date = date;
        this.page = page;
        this.printed = function() {
            return printList.isPrinting(this.type, this.id);
        }
        this.index = -1;
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
            var disabled = '';
            if(this.printed()) {
                disabled = 'disabled';
            }
            var string = '<tr><td>' + currentRow + '</td><td>' + subjectName + '</td><td>' + articleName + '</td><td>' + this.date + '</td><td>' + this.page + '</td><td><button type="button" class="print btn btn-default btn-xs ' + disabled + '" data-type="article" id="' + this.index + '">Add to Print</button></td></tr>';
            return string;
        }
    }
     // Article List class
    function ArticleList() {
        this.list = [];
        this.headers = ['Subject', 'Headline', 'Date', 'Page'];
        this.tableHead = function() {
            var string = '<p>' + this.list.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="sort"> No.</th><th class="sort"> Subject</th><th class="sort"> Headline</th><th class="sort"> Date</th><th class="sort"> Page</th><td class="sorter-false"><button type="button" id="printAllArticles" class="btn btn-primary btn-xs">Print All</button></td></tr></thead><tbody>';
            return string;
        }
        this.tableFoot = '</tbody></table>';
        this.addItem = function(item) {
            item.index = this.list.length;
            this.list.push(item);
        }
    }*/