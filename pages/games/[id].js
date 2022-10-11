import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import styles from "../../styles/GameDetails.module.css";
import { useAuth } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDetails } from "../../middlewares/game-details";
import { PLAYED } from "../../redux/actions/history";

export default function GameDetails() {
  const games = useSelector((state) => state.gameDetails.gameDetails);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const currentUser = useAuth();

  const gamePlayed = (e) => {
    dispatch({
      type: PLAYED,
      payload: id,
    });
  };

  useEffect(() => {
    dispatch(fetchGameDetails(id));
  }, []);

  return (
    <>
      <Container
        fluid
        className={
          styles.slider + " d-flex align-items-end justify-content-center w-100"
        }
        style={{ backgroundImage: `url(${games?.imageURL})` }}
      >
        <div
          className={
            styles.gameNameBox +
            " d-flex align-items-center flex-column justify-content-end p-3 p-md-5"
          }
        >
          <h1 className="mb-3 text-white">{games?.name}</h1>

          <div className="d-flex mb-4">
            <div className="d-inline-block">
              <i className="fa-solid fa-star text-warning"></i>
              <i className="fa-solid fa-star text-warning"></i>
              <i className="fa-solid fa-star text-warning"></i>
              <i className="fa-solid fa-star text-warning"></i>
              <i className="fa-solid fa-star-half text-warning"></i>
            </div>
            <div className="ms-2 text-warning">4.5</div>
          </div>
          <div onClick={currentUser && gamePlayed}>
            <Link
              href={
                currentUser
                  ? games?.slug
                    ? `/games/${games?.slug}`
                    : "/games/soon"
                  : "/login"
              }
            >
              <Button
                color="warning"
                outline
                className="px-4 py-2 px-md-5 py-md-3 text-uppercase fw-bold"
              >
                Play Now
                <span className="ms-2">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      <Container fluid className={styles.gameInfo + " py-4"}>
        <Row xs="1" md="3">
          <Col className="mb-4 mb-md-0">
            <h4 className="text-white text-center">Release</h4>
            <div className="text-white text-center">{games?.releaseDate}</div>
          </Col>
          <Col className="mb-4 mb-md-0">
            <h4 className="text-white text-center">Genre</h4>
            <div className="text-white text-center">{games?.genre}</div>
          </Col>
          <Col>
            <h4 className="text-white text-center">Developer</h4>
            <div className="text-white text-center">{games?.developer}</div>
          </Col>
        </Row>
      </Container>

      <Container
        fluid
        className={
          styles.details +
          " d-flex justify-content-center align-items-center px-4 px-md-5"
        }
        style={{ backgroundImage: `url(${games?.imageURL})` }}
      >
        <section className={styles.desc + " p-4 d-flex flex-column"}>
          <h2 className="mb-3">Description</h2>
          <p className="lh-lg">{games?.description}</p>
        </section>
        <section className={styles.lead + " w-100 p-4 d-flex flex-column"}>
          <h2 className="mb-3">Leaderboards</h2>
          <ListGroup numbered>
            <ListGroupItem className={styles.listGroup + " p-3"}>
              First Player
            </ListGroupItem>
            <ListGroupItem className={styles.listGroup + " p-3"}>
              Second Player
            </ListGroupItem>
            <ListGroupItem className={styles.listGroup + " p-3"}>
              Third Player
            </ListGroupItem>
            <ListGroupItem className={styles.listGroup + " p-3"}>
              Fourth Player
            </ListGroupItem>
            <ListGroupItem className={styles.listGroup + " p-3"}>
              Fifth Player
            </ListGroupItem>
          </ListGroup>
        </section>
      </Container>
    </>
  );
}
