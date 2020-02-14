import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      /*pour les <LIKE/> et le <BUTTON/> */
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>

              /*ex: 
              we need:     <td>{m.genre.name}</td>
              we then try :<td>{item[column.path]}</td> 
              would be equivalent to: 
              **** <td>{item['genre.name']}</td> ****  or
              **** <td>{item.'genre.name'}</td> ****
              This doesn't work. 
              INSTEAD we use the method lodash: _.get(item,column.path)
              --> on associe a chque attribut d'un Movie <=>un attribut de la colonne.
              */
            ))}
          </tr>
        ))}

        {/*data.map(m => (
          <tr key={m._id}>
            <td>{m.title}</td>
            <td>{m.genre.name}</td>
            <td>{m.numberInStock}</td>
            <td>{m.dailyRentalRate}</td>
        
            <td>
              <Like thumb={m.thumb} onClick={() => like(m)} />
            </td>

            <td>
              <button
                onClick={() => deleteMovie(m)}
                className="btn btn-outline-danger"
              >
                DELETE
              </button>
            </td>
          </tr>
          
        ))}
        */}
      </tbody>
    );
  }
}

export default TableBody;
