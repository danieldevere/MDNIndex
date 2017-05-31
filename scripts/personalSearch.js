/*// Obituary Class
    function Obituary(lastname, firstname, birthdate, deathdate, obitdate, page, id) {
        this.type = 'obituary';
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthdate = birthdate;
        this.deathdate = deathdate;
        this.obitdate = obitdate;
        this.page = page;
        this.printed = function() {
            return printList.isPrinting(this.type, this.id);
        }
        this.index = -1;
        this.id = id;
        this.tableRow = function(currentRow) {
            var disabled = '';
            if(this.printed()) {
                disabled = 'disabled';
            }
            var string = '<tr><td>' + currentRow + '</td><td>' + this.lastname + '</td><td>' + this.firstname + '</td><td>' + this.birthdate + '</td><td>' + this.deathdate + '</td><td>' + this.obitdate + '</td><td>' + this.page + '</td><td><button type="button" class="print btn btn-default btn-xs ' + disabled + '" data-type="obituary" id="' + this.index + '">Add to Print</button></td></tr>';
            return string;        
        }
    }

    // Wedding Class
    function Wedding(lastname, firstname, announcement, weddingdate, articledate, page, id) {
        this.type = 'wedding';
        this.lastname = lastname;
        this.firstname = firstname;
        this.announcement = announcement;
        this.weddingdate = weddingdate;
        this.articledate = articledate;
        this.page = page;
        this.printed = function() {
            return printList.isPrinting(this.type, this.id);
        }
        this.index = -1;
        this.id = id;
        this.tableRow = function(currentRow) {
            var disabled = '';
            if(this.printed()) {
                disabled = 'disabled';
            }
            var string = '<tr><td>' + currentRow + '</td><td>' + this.lastname + '</td><td>' + this.firstname + '</td><td>' + this.announcement + '</td><td>' + this.weddingdate + '</td><td>' + this.articledate + '</td><td>' + this.page + '</td><td><button type="button" class="print btn btn-default btn-xs ' + disabled + '" data-type="wedding" id="' + this.index + '">Add to Print</button></td></tr>';
            return string;          
        }
    }
     // Obituary List class
    function ObituaryList() {
        this.list = [];
        this.headers = ['Last Name', 'First Name', 'Birth Date', 'Death Date', 'Obituary Date', 'Page'];
        this.tableHead = function() {
            var string = '<p>' + this.list.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="sort"> No.</th><th class="sort"> Last Name</th><th class="sort"> First Name</th><th class="sort"> Birth Date</th><th class="sort"> Death Date</th><th class="sort"> Obituary Date</th><th> Page</th><td class="sorter-false"><button type="button" id="printAllObits" class="btn btn-primary btn-xs">Print All</button></td></tr></thead><tbody>';
            return string;                     
        }
        this.tableFoot = '</tbody></table>';
        this.addItem = function(item) {
            item.index = this.list.length;
            this.list.push(item);
        }
    }
    // Wedding List class
    function WeddingList() {
        this.list = [];
        this.headers = ['Last Name', 'First Name', 'Announcement', 'Wedding Date', 'Article Date', 'Page'];
        this.tableHead = function() {
            var string = '<p>' + this.list.length.toLocaleString('en') + ' Results</p><table class="table tablesorter" id="myTable"><thead><tr><th class="sort"> No.</th><th class="sort"> Last Name</th><th class="sort"> First Name</th><th class="sort"> Announcement</th><th class="sort"> Wedding Date</th><th> Article Date</th><th> Page</th><td class="sorter-false"><button type="button" class="btn btn-primary btn-xs" id="printAllWeddings">Print All</button></td></tr></thead><tbody>';
            return string;       
        }
        this.tableFoot = '</tbody></table>';
        this.addItem = function(item) {
            item.index = this.list.length;
            this.list.push(item);
        }
    }*/