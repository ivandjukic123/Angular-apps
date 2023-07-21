import { Component, Input, OnInit } from '@angular/core';
import { DummyPost } from '../../interfaces/dummy-post';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DummyService } from '../../services/dummy.service';
import { DummyUser } from '../../interfaces/dummy-user';
import { DummyComments } from '../../interfaces/dummy-comments';

@Component({
  selector: 'app-dummy-post',
  templateUrl: './dummy-post.component.html',
  styleUrls: ['./dummy-post.component.scss']
})
export class DummyPostComponent implements OnInit {
  @Input() post!: DummyPost;
  author: DummyUser | undefined;
  comments: DummyComments[] = [];
  isLoading = false;

  constructor(private modalService: NgbModal,
              public dummyService: DummyService) {
  }

  ngOnInit(): void {
  }

  onTagClick(tag: string) {
    this.dummyService.selectTag(tag);
  }

  loadCommentsByPostId(id: number, modal: any) {
    this.dummyService.getDummyComments(id)
      .subscribe(value => {
          this.comments = value;
          this.modalService.open(modal, { centered: true });
        }
      );
  }

  loadAuthorByPostId(id: number, modal: any) {
    this.modalService.open(modal)
      .result
      .finally(() => {
        this.author = undefined;
      });
    this.isLoading = true;
    this.dummyService.getDummyUserById(id)
      .subscribe(value => {
        this.isLoading = false;
        // here we assign value to user/author of post
        this.author = value;
        // after we have this value in this.author variable, we can use it in html,
        // otherwise we are accessing author.email or some other properties and this.author is undefined so error pops!
      });
    // if we open modal here, it will happen before data is loaded in this.author variable
    // because API call is async, and it takes time for it to be done, while our code continues running, hence opening modal and no data is there.
  }
}
