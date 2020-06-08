import Realm from 'realm';


export const TODOLIST_SCHEMA = "TodoList";
export const TODO_SCHEMA = "Todo";


export const TodoSchema = {
    name : TODO_SCHEMA,
    primaryKey : 'id',
    properties : {
        id : 'int',
        name: {type : 'string', indexed: true},
        done: {type: 'bool', default : false},
    }
};


export const TodoListSchema = { 
    name : TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties : {
        name: 'string',
        creationDate: 'date',
        todos : {type: 'list', objectType: TODOLIST_SCHEMA }
    }
 }


const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0
}
export const insertNewTodoList = newTodoList => new Promise((resolve , reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(
            ()=> {
                realm.create(TODOLIST_SCHEMA, newTodoList);
                resolve(newTodoList);
            }
        )
    }).catch(err => reject(err))
});


export const updateTodoList = todoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm => {
        realm.write(
            () => {
                let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id);
                updateTodoList.name = todoList.name;

            }
        )
    })).catch(err => reject(err));
});

export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(
            ()=> {
                let deleteingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
                realm.delete(deleteingTodoList);
                resolve()
            }
        )
    }).catch(err => reject(err));
});

export const deleteAllTodoLists = () => new Promise(
    (resolve, reject) => {
        Realm.open(databaseOptions).then(
            realm => {
                realm.write(
                    ()=> {
                        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
                        realm.delete(allTodoLists);
                        resolve();
                    }
                )
            }
        ).catch(err => reject(err))
    }
);


export const queryAllTodoLists = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
        resolve(allTodoLists);
    }).catch(err => reject(err));
});

export default new Realm(databaseOptions);

