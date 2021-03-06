var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function(scriptTemplateId) {
  // TODO: Use handlebars to render your articles!
  //       - Select your template from the DOM.
  //       - Now "compile" your template with Handlebars.
  // DONE: If your template will use properties that aren't on the object yet, add them.
  //   Since your template can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced
  //   by a key in the template. For example, you might want to display how old a post is,
  //   or say "(draft)" if it has no publication date:
  var template = Handlebars.compile($(scriptTemplateId).text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return template(this);


  // TODO: Use the function that Handlebars gave you to return your filled-in
  //       html template for THIS article.
};

Article.prototype.populateAuthor = function() {
  var source = $('#author-filter-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};
Article.prototype.populateCategories = function() {
  var source = $('#category-filter-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};

ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a){

  if ($('#category-filter:contains("' + a.category + '")').length === 0) {
    $('#category-filter').append(a.toHtml('#category-filter-template'));
  }
  $('#author-filter').append(a.toHtml('#author-filter-template'));
  $('#articles').append(a.toHtml('#article-template'));
});
