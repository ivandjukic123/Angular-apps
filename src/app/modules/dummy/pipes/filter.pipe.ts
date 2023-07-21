import { Pipe, PipeTransform } from '@angular/core';
import { DummyPost } from '../interfaces/dummy-post';

@Pipe({
  name: 'pipeFilter'
})
export class FilterPipe implements PipeTransform {

  transform(value: DummyPost[], selectedTag: string): any {
    if (selectedTag) {
      return value.filter(post => {
        return post.tags.some(tag => selectedTag === tag);
      });
    } else {
      return value;
    }
  }
}
