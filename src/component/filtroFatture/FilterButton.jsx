import { Button, Row, Col } from "react-bootstrap";

const FILTERS = ["Tutte", "Pagata", "Non Pagata", "In Attesa"];
const COLORS = {
  Pagata: "#8BC94D",
  "In Attesa": "#FFB400",
  "Non Pagata": "#EE404C",
  Tutte: "#B92858",
};

function FilterButton({ activeFilter, setActiveFilter }) {
  return (
    <Row className="justify-content-center mb-3">
      {FILTERS.map((filterI) => {
        const color = COLORS[filterI];
        const isActive = activeFilter === filterI;

        return (
          <Col key={filterI} xs="auto" className="px-1 my-3">
            <Button
              onClick={() => setActiveFilter(filterI)}
              style={{
                backgroundColor: isActive ? color : "transparent",
                border: `2px solid ${color}`,
                color: isActive ? "#fff" : color,
                borderRadius: "20px",
                padding: "0.3rem 1rem",
              }}
            >
              {filterI}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
}

export default FilterButton;
