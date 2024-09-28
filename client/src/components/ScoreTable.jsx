import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useBackendService } from "../ContextAPI/connectToBackend";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER}`);

function ScoreTable() {
  const { getMatchData, matchData } = useBackendService();
  const gameId = useParams();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getMatchData(gameId.id);
  }, [gameId.id]);

  useEffect(() => {
    if (matchData?.scores) {
      const firstTeamName = toSentenceCase(matchData.firstTeamName);
      const secondTeamName = toSentenceCase(matchData.secondTeamName);
      const combined = matchData?.scores.map((newData) => ({
        ...newData,
        firstTeamName,
        secondTeamName,
      }));
      setTableData(combined.reverse());
    }
  }, [matchData]);

  useEffect(() => {
    socket.on("score_updated", (data) => {
      if (data.status === "start") {
        setTableData((prev) => [data, ...prev]);
      }
    });

    return () => {
      socket.off("score_updated");
    };
  }, []);

  function toSentenceCase(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const columns = [
    {
      field: "firstTeamName",
      headerName: "First Team Name",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "secondTeamName",
      headerName: "Second Team Name",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "firstTeamScore",
      headerName: "First Team Score",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "secondTeamScore",
      headerName: "Second Team Score",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "numberOfShuttlecock",
      headerName: "Shuttle Cock",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
  ];

  return (
    <>
      <DataGrid
        rows={tableData}
        getRowId={(row) => row._id}
        columns={columns}
        hideFooter
        disableSelectionOnClick
        sx={{
          border: "none",
          width: "100%",
          // borderRadius: "20px",
          "& .MuiDataGrid-cell": {
            minHeight: 60,
            textAlign: "center",
            backgroundColor: "white",
            fontSize: "clamp(12px,  2.5vw, 14px)",
            lineHeight: "50px",
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "12px",
            backgroundColor: "#d0d0d0",
            lineHeight: "100px",
            whiteSpace: "normal",
            wordWrap: "break-word",
            height: "auto",
            width: "100%",
            "@media (min-width: 600px)": {
              fontSize: "14px",
            },
            "@media (min-width: 900px)": {
              fontSize: "16px",
            },
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: "normal",
          },
        }}
      />
    </>
  );
}

export default ScoreTable;
