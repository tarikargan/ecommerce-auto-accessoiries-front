import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
    environment                       : any      = environment;

    postId                            : any;

    postData                          : any;
    otherPostsData                    : any[]   = [];

    loading                           : boolean = true;

    activeUrl                          : string   = '';

     constructor(
      private blogService: BlogService,
      private route: ActivatedRoute
     ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
         this.postId = params.get('id');
          // this.loadPost(id);
          this.getPosts();
        });
        // this.loadBlogs();
      }


  getPosts() {
    this.blogService
    .get(this.postId)
    .pipe(take(1))
    .subscribe((posts:any) => {
      let container = document.querySelector('.content_area');
      container?.scrollTo({ top: 0, behavior: 'smooth' });
      this.postData       = posts?.blogPost;
      this.activeUrl      = posts?.blogPost?.images.length > 0 ? environment?.Upload?.apiUrl + posts?.blogPost?.images[0].url : '';
      this.otherPostsData = posts?.randomPosts;
      console.log({posts}, this.activeUrl);

      // this.postData = posts;
      this.loading = false;
    });
  }

  handleChangeImg(imgUrl:any){

    let img = document.querySelector('.postImg') as HTMLImageElement;
    img.src = imgUrl;
    this.activeUrl = imgUrl;

  }
}
