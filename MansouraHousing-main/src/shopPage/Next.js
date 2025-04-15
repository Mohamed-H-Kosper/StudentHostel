import "./Next.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
function Next() {
  return (
    <>
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div
          className="btn-group me-2 group-btn"
          role="group"
          aria-label="group-Button"
        >
          <button type="button" className="btn button-next">
            1
          </button>
          <button type="button" className="btn button-next ">
            2
          </button>
          <button type="button" className="btn button-next">
            3
          </button>
          <button type="button" className="btn button-next">
            4
          </button>
          <button type="button" className="btn button-next">
            5
          </button>
          <button type="button" className="btn button-next">
            Next
          </button>
        </div>
      </div>
    </>
  );
}
export default Next;
