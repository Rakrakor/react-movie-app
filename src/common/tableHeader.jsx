import React, { Component } from "react";

//columns: array   ( un nouvel attribut)
//sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumnClone = { ...this.props.sortColumn }; // { }: clone d'un object
    if (sortColumnClone.path === path) {
      sortColumnClone.order = sortColumnClone.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }
    this.props.onSort(sortColumnClone);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }
    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    } else {
      return <i className="fa fa-sort-desc"></i>;
    }
  };
  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              className="clickable"
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
