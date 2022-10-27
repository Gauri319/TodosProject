import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function EditButton({ edit }) {
  return (
    <div>
      {edit ? (
        <AddCircleOutlineIcon sx={{ color: "rgb(255,140,0)" }} />
      ) : (
        <EditIcon sx={{ color: "rgb(255,140,0)" }} />
      )}
    </div>
  );
}
