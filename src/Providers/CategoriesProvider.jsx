import React from "react";
import data from "../data.json";
import CatContext from "./CatContext";

class CategoriesProvider extends React.Component {
  updateData = data => {
    let categoryId = parseInt(data.getAttribute("catId"));
    let itemId = parseInt(data.getAttribute("itemId"));
    let categoriesData = this.state.data;
    let itemsData = this.state.data.categories
      .find(x => x.id === categoryId)
      .items.filter(function(item) {
        return item.id !== itemId;
      });
    categoriesData.categories.find(x => x.id === categoryId).items = itemsData;
    this.setState({ data: categoriesData });
  };

  state = {
    data: data,
    updateData: this.updateData
  };

  render() {
    return (
      <CatContext.Provider value={this.state}>
        {this.props.children}
      </CatContext.Provider>
    );
  }
}

export { CategoriesProvider };
