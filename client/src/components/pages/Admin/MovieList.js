import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/Slices/loaderSlice";
import { GetAllMovies } from "../../../apicalls/movieAPIcall";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MovieFormModal from "./MovieFormModal";
import DeleteMovieModal from "./DeleteMovieModal";

const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [movies, setMovies] = useState(null);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllMovies();
      if (response.success) {
        const allMovies = response.data;
        setMovies(
          allMovies.map((item) => {
            return { ...item, key: `movie${item._id}` };
          })
        );
      } else {
        console.log(response.message);
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      return message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            src={data.poster}
            alt="Movie Poster"
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render:(text,data)=>{
        return text.slice(0,105)+"...";
      }
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text, data) => {
        return `${text} mins`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className=" flex align-items-center gap-1">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedMovie(data);
              }}
            >
              <EditOutlined style={{paddingBottom:"5px"}}/>
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined style={{paddingBottom:"5px"}} />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
            setSelectedMovie(null);
          }}
        >
          Add Movie
        </Button>
      </div>
      <Table dataSource={movies} columns={columns} />
      {isModalOpen && (
        <MovieFormModal
          isModalOpen={isModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedMovie={selectedMovie}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </>
  );
};

export default MovieList;
