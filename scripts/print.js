/* // Print List class. Keeps track of what is printing
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
                if(this.articleList.findIndex(findItem) == -1) {
                    this.articleList.push(item);
                } else {
                    window.alert("You've already added this to the print queue");
                }
            } else if(item.type == 'obituary') {
                if(this.obituaryList.findIndex(findItem) == -1) {
                    this.obituaryList.push(item);
                } else {
                    window.alert("You've already added this to the print queue");
                }
            } else {
                if(this.weddingList.findIndex(findItem) == -1) {
                    this.weddingList.push(item);
                } else {
                    window.alert("You've already added this to the print queue");
                }
            }
            function findItem(find) {
                return find.id == item.id;
            }
        }
        this.clearPrints = function() {
            this.hasItems = false;
            this.articleList = [];
            this.obituaryList = [];
            this.weddingList = [];
        }
        this.isPrinting = function(type, item) {
            if(type == 'article') {
                if(this.articleList.length > 0) {
                    if(this.articleList.findIndex(findItem) != -1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else if(type == 'obituary') {
                if(this.obituaryList.length > 0) {
                    if(this.obituaryList.findIndex(findItem) != -1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                if(this.weddingList.length > 0) {
                    if(this.weddingList.findIndex(findItem) != -1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            function findItem(find) {
                return find.id == item;
            }
        }
        this.sortLists = function() {
            this.articleList.sort(sortArticles);
            this.weddingList.sort(sortPersonal);
            this.obituaryList.sort(sortPersonal);
            function sortArticles(a, b) {
                if(a.subject.toUpperCase() == b.subject.toUpperCase()) {
                    if(a.date < a.date) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    if(a.subject.toUpperCase() < b.subject.toUpperCase()) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            }
            function sortPersonal(a, b) {
                if(a.lastname.toUpperCase() == b.lastname.toUpperCase()) {
                    if(a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    if(a.lastname.toUpperCase() < b.lastname.toUpperCase()) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            }
        }
    }
*/