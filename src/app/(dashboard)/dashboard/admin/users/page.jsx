"use client";

import Spinner from "@/components/shared/loader/Spinner";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import useAllUsers from "@/hooks/useAllUsers";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";

const UserPage = () => {
  const { allUser, allUserLoading } = useAllUsers();

  if (allUserLoading) return <Spinner />;

  return (
    <div className="text-white">
      <div className="mb-5">
        <SectionTitle title="All Users" />
      </div>

      <div className="">
        {allUser.length !== 0 ? (
          <table className="table-auto w-full border border-white/60 border-collapse text-white">
            <thead>
              <tr className="border border-white/60">
                <th className="border border-white/60 px-4 py-2">#</th>
                <th className="border border-white/60 px-4 py-2">Cover</th>
                <th className="border border-white/60 px-4 py-2">Name</th>
                <th className="border border-white/60 px-4 py-2">Email</th>
                <th className="border border-white/60 px-4 py-2">Role</th>
                <th className="border border-white/60 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((user, idx) => (
                <tr key={user._id}>
                  <td className="border border-white/60 px-4 py-2">
                    {idx + 1}
                  </td>
                  <td className="border border-white/60 px-4 py-2 text-center">
                    <Image
                      src={user.photo}
                      className="size-10 inline-block rounded-full object-cover"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </td>
                  <td className="border border-white/60 px-4 py-2">
                    <p className="">{user.name}</p>
                  </td>
                  <td className="border border-white/60 px-4 py-2">
                    <p className="">{user.email}</p>
                  </td>
                  <td className="border border-white/60 px-4 py-2">
                    <p>{user.role}</p>
                  </td>
                  <td className="border border-white/60 px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-md cursor-pointer bg-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center text-2xl italic text-white/60 mt-5">
            No user available
          </h2>
        )}
      </div>
    </div>
  );
};

export default UserPage;
