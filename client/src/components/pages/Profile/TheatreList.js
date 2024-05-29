import { Button, Table, message } from "antd";
import TheaterModalForm from "./TheaterFormModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/Slices/loaderSlice";
import { getAllTheaters } from "../../../apicalls/theaterAPIcall";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteTheaterModal from "./DeleteTheaterModal";
import ShowModal from "./ShowModal";

const TheatreList = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [theaters, setTheaters] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const getData = async () => {
    const response = await getAllTheaters({ owner: user._id });
    try {
      dispatch(showLoading());
      const response = await getAllTheaters({ owner: user._id });
      if (response.success) {
        const allTheaters = response.data;
        setTheaters(
          allTheaters.map(function (item) {
            return { ...item, key: `theater${item._id}` };
          })
        );
      } else {
        console.log(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return `Approved`;
        } else {
          return `Pending/ Blocked`;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="flex d-flex align-items-center gap-1">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheater(data);
              }}
            >
              <EditOutlined style={{ paddingBottom: "7px" }} />
            </Button>

            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheater(data);
              }}
            >
              <DeleteOutlined
                style={{ paddingBottom: "7px", paddingLeft: "1px" }}
              />
            </Button>
            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheater(data);
                }}
              >
                +Shows
              </Button>
            )}
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
            setSelectedTheater(null);
          }}
        >
          Add Theater
        </Button>
      </div>
      <Table dataSource={theaters} columns={columns} />
      {isModalOpen && (
        <TheaterModalForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheaterModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedTheater={selectedTheater}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTheater={setSelectedTheater}
          getData={getData}
        />
      )}
      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheater={selectedTheater}
        />
      )}
    </>
  );
};

export default TheatreList;
