import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/Slices/loaderSlice";
import { DeleteTheater } from "../../../apicalls/theaterAPIcall";

const DeleteTheaterModal = ({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedTheater,
    setSelectedTheater,
    getData
}) => {

    const dispatch = useDispatch();
    const handleOk = async () =>{
        try {
            dispatch(showLoading());
            const theaterId = selectedTheater._id;
            const response = await DeleteTheater({theaterId});
            console.log(theaterId,response);
            if(response.success){
                message.success(response.message);
                getData();
            }else{
                message.error(response.message);
                setSelectedTheater(null);
            }
            setIsDeleteModalOpen(false);
            dispatch(hideLoading());
        } catch (error) {
            dispatch(hideLoading());
            setIsDeleteModalOpen(false);
            message.error(error.message);
        }
    }

    const handleCancel = () =>{
        setIsDeleteModalOpen(false);
        setSelectedTheater(null);
    }

  return (
    <>
      <Modal
        title="Delete Theater?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this theater?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theater data.
        </p>
      </Modal>
    </>
  );
};

export default DeleteTheaterModal;
