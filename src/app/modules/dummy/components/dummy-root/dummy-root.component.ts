import { Component, OnInit } from '@angular/core';
import { DummyService } from '../../services/dummy.service';
import { DummyTodo } from '../../interfaces/dummy-todo';
import { Observable } from 'rxjs';
import { DummyUser } from '../../interfaces/dummy-user';
import { DummyPost } from '../../interfaces/dummy-post';

@Component({
  selector: 'app-dummy-root',
  templateUrl: './dummy-root.component.html',
  styleUrls: ['./dummy-root.component.scss']
})
export class DummyRootComponent implements OnInit {
  todos0: any[] = [];
  todos: DummyTodo[] = [];
  todos1: DummyTodo[] = [];
  todos2: DummyTodo[] = [];
  todos3: DummyTodo[] = [];
  todos4: DummyTodo[] = [];
  todos$: Observable<DummyTodo[]>;
  users: DummyUser[] = [];
  singleUser?: DummyUser;
  posts: DummyPost[] = [];
  postFilterOptions: number[] = [5, 10, 15, 25, 50];

  constructor(public dummyService: DummyService) {
    this.todos$ = this.dummyService.getDummyTodos4();
  }

  ngOnInit(): void {
    // this.dummyService.getDummyTodos0()
    //   .subscribe(value => {
    //     console.log('getDummyTodos0()', value);
    //     // Doesn't work, can't even compile, even logic and data is correct
    //     // Uncomment line 29 and see why
    //     // this.todos = value.todos;
    //   });
    // this.dummyService.getDummyTodos()
    //   .subscribe(value => {
    //     console.log('getDummyTodos()', value);
    //     this.todos = value.todos;
    //   });
    // this.dummyService.getDummyTodos1()
    //   .subscribe(value => {
    //     console.log('getDummyTodos1()', value);
    //     this.todos1 = value.todos;
    //   });
    // this.dummyService.getDummyTodos2()
    //   .subscribe(value => {
    //     console.log('getDummyTodos2()', value);
    //     this.todos2 = value;
    //   });
    // this.dummyService.getDummyTodos3()
    //   .subscribe(value => {
    //     console.log('getDummyTodos3()', value);
    //     this.todos3 = value;
    //   });
    // this.dummyService.getDummyTodos4()
    //   .subscribe(value => {
    //     console.log('getDummyTodos4()', value);
    //     this.todos4 = value;
    //   });
    //dummy users subscription
    this.dummyService.getDummyUsers()
      .subscribe(value => {
        // console.log('getDummyUsers()', value);
        this.users = value;
      });

    // dummy user tasks
    this.dummyService.getDummyTodos3()
      .subscribe(value => {
        this.todos3 = value;
        // 1
        // All good, names of variables changed!
        // So we know what this array holds -> todoIds
        const todoIds = this.todos3.map(todo => todo.id);
        // console.log('[ Task #1 ] Todo Ids', todoIds);

        // 2
        // This works, but not in way we specified using map
        // we could have done this with forEach also like
        const task2: number[] = [];
        this.todos3.forEach((todo: DummyTodo) => {
          if (todo.id >= 1 && todo.id <= 10) {
            task2.push(todo.id);
          }
        });
        // here we first filter for 1 - 10, then we map and return only ids as specified
        // console.log('[ Task 2 ]', task2);
        const task2_1: number[] = this.todos3
          .filter((todo: DummyTodo) => {
            return todo.id >= 1 && todo.id <= 10;
          })
          .map((todo: DummyTodo) => {
            return todo.id;
          });
        // console.log('[ Task 2.1 ]', task2_1);
        // here we first map and return array of ids, then we filter using those ids
        const task2_2: number[] = this.todos3
          .map((todo: DummyTodo) => {
            return todo.id;
          })
          .filter((id: number) => {
            return id >= 1 && id <= 10;
          });
        // console.log('[ Task 2.2 ]', task2_2);

        let idArray: any[] = [];
        todoIds.map(todo => {
          if (todo >= 1 && todo <= 10) {
            idArray.push(todo);
          }
        });
        // console.log('get id from 1 - 10', idArray);

        // 3
        this.renamedProperty();

        // 4
        this.specificUserTodos(1);

        // 5
        this.completedElements();

        // 6
        this.specificCharacters();

        // 7
        this.additionalProperty();

        // 8
        this.textLength();
      });

    // dummy posts
    this.dummyService.getDummyPosts()
      .subscribe((value: DummyPost[]) => {
        //we want to add more and more posts to our posts array (figure it out)
        this.posts = value;
      });
  }

// limit api properties
  onOptionSelect(option: number) {
    this.dummyService.postHttpParams.limit = option;
    this.dummyService.postHttpParams.skip = 0;
    this.dummyService.postHttpParams.total = 0;
    this.dummyService.getDummyPosts()
      .subscribe((value: DummyPost[]) => {
        this.posts = value;
        console.log(option);
      });
  }

  // load more posts
  loadMorePosts(): void {
    this.dummyService.getDummyPosts()
      .subscribe((value: DummyPost[]) => {
        // this.posts = [...this.posts, ...value];
        this.posts = this.posts.concat(value);
      });
  }

  // User assignment #1
  // When we select user, we make call to API to get single user by ID
  // example https://dummyjson.com/users/5 will return user with ID 5, check in browser how model looks
  // After API call is done we want to assign it to variable(like we did for every todos yesterday), and use it in html template
  // Create a card in place I specified (in html), and fill card with data name, image(should be card image!), email, phone, address, blood group,
  // height, weight and some more u see fit. (I created listing ones, so you have example)
  // Also try to use interface everywhere to describe data (replace type :any with proper types)
  // Remember we get single user from this API as you will see in browser, not array or array of arrays!
  onUserSelect(user: DummyUser): void {
    this.dummyService.getDummyUserById(user.id)
      .subscribe(value => {
        this.singleUser = value;
      });
  }

  //Todos
  // Assignment
  // 1. Create new array that contains only ids
  // 2. Create new array that contains only ids that are between 1 - 10
  // 3. Create new array that has all properties {
  //   id: number;
  //   todo: string;
  //   completed: boolean;
  //   userId: number;
  // } but `todo` property will be renamed to `text`

  renamedProperty() {
    // this is correct but not fully, u returned array that has array in it, so you created matrix
    // [
    //  [
    //    {id.., text.., completed.., userId...},
    //    {id.., text.., completed.., userId...}
    //    ....
    //   ]
    // ]
    // this is array
    let renamedProperty: any[] = [];
    //map is returning new array, so you are pushing array in array hence u made example from above line 146
    renamedProperty.push(this.todos3.map(todo => {
      return {
        id: todo.id,
        text: todo.todo,
        completed: todo.completed,
        userId: todo.userId
      };
    }));
    // console.log('Renamed property', renamedProperty);
    // better way ->
    // like we said map returns new array, and we assign that new array to task3 variable
    const task3 = this.todos.map((todo: DummyTodo) => {
      return {
        id: todo.id,
        text: todo.todo,
        completed: todo.completed,
        userId: todo.userId
      };
    });
    // console.log('[ Task 3 ]', task3);
  }

  // 4. Create new array that contains only elements by specific user Id (make a method that accepts userId and only show todos with that userId)
  specificUserTodos(userId: number) {
    let specificUserTodos: any[] = [];
    specificUserTodos.push(this.todos3.filter(todo => {
        return todo.userId === userId;
      })
    );
    // console.log('Specific user todos', specificUserTodos);

    //good filter logic, same issue as above
    const task4 = this.todos3.filter(todo => {
      return todo.userId === userId;
    });
    // or u can shorten it now when its this simple
    const task4_1 = this.todos3.filter(todo => todo.userId === userId);
    // console.log('[ Task 4 ]', task4, task4_1);
  }

  // 5. Create new array that contains only `completed` elements and transform them to be only properties {id, text (which was named `todo`)}
  completedElements() {
    let completedElements = this.todos3.filter(todo => {
      return todo.completed;
    })
      .map(todo => {
          return {
            id: todo.id,
            text: todo.todo
          };
        }
      );
    // console.log('Completed elements', completedElements);
  }

  // 6. Create new array that has {todo} text less than 25 characters
  specificCharacters() {
    let textCharacters = this.todos3.filter(todo => {
      return todo.todo.length < 25;
    })
      .map(todo => {
          return {
            id: todo.id,
            text: todo.todo,
            completed: todo.completed,
            userId: todo.userId
          };
        }
      );
    // console.log('Characters', textCharacters);
  }

  // 7. Create new array that has additional property {uid} which we create by concatenating {id, userId}
  // example uid: `${el.id}${el.userId}`
  additionalProperty() {
    let newProperty = this.todos3.map(todo => {
      return {
        id: todo.id,
        text: todo.todo,
        completed: todo.completed,
        userId: todo.userId,
        uid: `${todo.id}${todo.userId}`
      };
    });
    // console.log('New property', newProperty);
  }

  // 8. Create new array that has {id, text (former todo), textLen: (length of todo text)}
  textLength() {
    let newArray = this.todos3.map(todo => {
      return {
        id: todo.id,
        text: todo.todo,
        textLen: todo.todo.length
      };
    });
    // console.log('Todo text length', newArray);
  }

  clearSelectedTag(): void {
    this.dummyService.selectedTag = '';
  }
}
