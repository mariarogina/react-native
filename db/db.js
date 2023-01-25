import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'shopping.db'});
var tableName = 'shopping';
//method returns a Promise
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // tx.executeSql('DROP TABLE IF EXISTS shopping', []);
      //sometimes it is good to empty the table
      //By default, primary key is auto_incremented
      tx.executeSql(
        'create table if not exists ' +
          tableName +
          '(id integer not null primary key, type text not null, pcs integer not null);',
        [],
        //second parameters of execution:empty square brackets
        // this parameter is not needed when creating table
        () => {
          resolve();
          //There is no need to return anything
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const addProduct = (type, pcs) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement,
      //just putting placeholders to the values to be inserted
      tx.executeSql(
        'insert into ' + tableName + '(type, pcs) values(?,?);',
        //And the values come here
        [type, pcs],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const updateProduct = (id, type, pcs) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the prepared statement,
      //just putting placeholders to the values to be inserted
      tx.executeSql(
        'update ' + tableName + ' set type=?, pcs=? where id=?;',
        //And the values come here
        [type, pcs, id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const deleteProduct = id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the prepared statement,
      //just putting placeholders to the values to be inserted
      tx.executeSql(
        'delete from ' + tableName + ' where id=?;',
        //And the values come here
        [id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllProducts = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we select all from the table fish
      tx.executeSql(
        'select * from ' + tableName,
        [],
        (tx, result) => {
          let items = [];
          //Create a new empty Javascript array
          //And add all the items of the result (database rows/records) into that table

          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
            //The form of an item is {"type": "Leather Product", "id": 1, "pcs": 47}
            console.log(result.rows.item(i));
            //For debugging purposes to see the data in console window
          }
          console.log(items);
          //For debugging purposes to see the data in console window
          resolve(items);
          //The data the Promise will have when returned
        },
        (tx, err) => {
          console.log('Err');
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};
