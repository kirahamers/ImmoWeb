import React from "react";
import { useNavigate } from 'react-router-dom';
import AdminFilter from "../components/AdminFilter";
import NavigationAdmin from "../components/NavigationAdmin";
const huizenData = require('../utils/huizen.json');


const AdminPage = () => {
  
    const navigate = useNavigate();

    return (
      <>
      <NavigationAdmin></NavigationAdmin>
        <AdminFilter></AdminFilter>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
            {huizenData.panden.map((h) => (
              <div
                onClick={() => navigate(`/adminhuizen/${h.id}`)}
                key={h.id}
                className="relative w-full h-auto flex flex-col justify-between overflow-clip align-middle rounded-md shadow-md cursor-pointer"
              >
                <img
                  className="w-full h-3/4 object-cover"
                  src={h.afbeelding}
                  alt={h.beschrijving}
                />
                <p className="font-semibold text-center">{h.beschrijving}</p>
                <p className="text-center -mt-3 text-gray-400">{h.gemeente}, €{h.prijs}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

export default AdminPage;