{
  a.children.map((c, d, ttt) => {
    return (
      <div
        style={{
          top: this.subcatindexchecker(b, d) + "%",
          border:
            this.state.animation[d].animationstate === "not going"
              ? "1px solid rgb(218, 247, 247)"
              : "1px solid rgb(181, 245, 245) ",
          borderWidth: "1px 0 1px 0"
        }}
        className="subsubcategories"
        onClick={this.props.getcards({
          subcategory: c,
          category: a.name
        })}
      >
        {c}
      </div>
    );
  });
}
