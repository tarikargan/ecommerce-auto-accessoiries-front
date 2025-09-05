import { Component } from '@angular/core';
import { map, take } from 'rxjs';
import { BlogPost } from 'src/app/core/classes/blog';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  environment                       :any      = environment;
  editItem            : any
  loading             : boolean           = true;
  blogPosts           : any[]             = [];

  showForm            : boolean           = false;
  eventType           : any               = EventTypes.Add;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    // this.loadBlogs();
    this. getPosts();
  }

  getPosts() {
    this.blogService
    .getAll()
    .pipe(take(1), map((el:any) => el?.data))
    .subscribe((posts) => {
      console.log({posts});

      this.blogPosts = posts;
      this.loading = false;
    });
  }

  deleteBlog(id: number) {
    // if (confirm('Are you sure you want to delete this blog post?')) {
    //   this.blogService.delete(id).subscribe(() => this.loadBlogs());
    // }
  }

  handleSearch(ev:any){

  }

  toggleForm(){
     this.eventType = EventTypes.Add;
     this.showForm = !this.showForm;
  }

  handleAdedNewItem(data:any){
    console.log({data});

    this.showForm = false;
    this.blogPosts = [data,...this.blogPosts];
  }


  handleUpdatedItem(data:any){
    this.showForm = false;
    this.eventType = EventTypes.Add;
    this.blogPosts = this.blogPosts.map((item:any) =>{
      if(item.id === data.id){
        return data;
      }else{
        return item;
      }

    });
  }


  details(post:any){

  }


  duplicate(post:any){
    this.editItem   = post
    this.eventType  = EventTypes.Duplicate;
    this.showForm   = true;
  }


  edit(post:any){
    this.editItem   = post
    this.eventType  = EventTypes.Edit;
    this.showForm   = true;
  }


  delete(id:any){
    this.blogService.delete(id)
    .pipe(take(1))
    .subscribe(()=>{
      this.blogPosts = this.blogPosts.filter((item:any) => item.id !== id);
    },err => {
      console.log('something was wrong')
    });
  }


  removeCard(id:any){
    // this.blogPosts = this.blogPosts.filter((item:any) => item.id !== id);
    this.blogService.delete(id)
    .pipe(take(1))
    .subscribe(()=>{
      this.blogPosts = this.blogPosts.filter((item:any) => item.id !== id);
    },err => {
      console.log('something was wrong')
    });
  }






  getStyle(order:any){

  }

  getActiveEtape(order:any) {

  }
}
