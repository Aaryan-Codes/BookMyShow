import { Col, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/Slices/loaderSlice";
import { GetAllMovies } from "../../apicalls/movieAPIcall";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {SearchOutlined} from '@ant-design/icons';
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllMovies();
      setMovies(response.data);
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      return error.message(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input placeholder="Search for Movies" type="text" onChange={handleSearch} prefix={<SearchOutlined/>}></Input>
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row className="justify-content-center"
      gutter={{
        xs:8,
        sm:16,
        md:24,
        lg:32
      }}
      >
        {movies &&
          movies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()))
          .map((movie) => (
            <Col
              className="gutter-row mb-5"
              key={movie._id}
              span={{
                xs: 24,
                sm: 24,
                md: 12,
                lg: 10,
              }}
            >
              <div className="text-center">
                <img
                  onClick={() => {
                    navigate(
                      `/movie/${movie._id}?date=${moment().format(
                        "YYYY-MM-DD"
                      )}`
                    );
                  }}
                  className="cursor-pointer"
                  src={movie.poster}
                  alt="Movie Poster"
                  style={{ borderRadius: "8px",width:"200px",height:"300px" }}
                />
                <h3
                  onClick={() => {
                    navigate(
                      `/movie/${movie._id}?date=${moment().format(
                        "YYYY-MM-DD"
                      )}`
                    );
                  }}
                  className="cursor-pointer font-semibold mt-2"
                >
                  {movie.title}
                </h3>
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Home;
