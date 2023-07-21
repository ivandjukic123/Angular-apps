import { Pipe, PipeTransform } from '@angular/core';
import { DummyPost } from '../interfaces/dummy-post';

@Pipe({
  name: 'filterByTag'
})
export class FilterByTagPipe implements PipeTransform {

  transform(posts: DummyPost[], selectedTag: string): DummyPost[] {
    // check if we have selectedTag, and if we have any posts that have at least 1 element
    if (selectedTag && posts && posts.length > 0) {
      // long filter method, it can be shortened ofc
      return posts.filter((post: DummyPost) => {
        // use includes method to see if selectedTag is in post.tags
        if (post.tags.includes(selectedTag)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return posts;
  }

}
