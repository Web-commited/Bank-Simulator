'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { updateUserId } from "@/app/store/userSlice";
import { redirect } from "next/navigation";
import RootNavbar from "@/components/RootNavbar";
import SpecialNavbar from "@/components/SpecialNavbar";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAppSelector((state) => state.user);
  const user_id = user.user_id;
  const dispatch = useAppDispatch();

  // Function to update the user's state if not already set
  const updateUserState = async () => {
    if (!user_id) {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        // If there's no user, redirect or set to non-authenticated state
        return;
      } else {
        dispatch(updateUserId(data.user.id));
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await updateUserState();
    };
    fetchUserData();
  }, [user_id]);

  return (
    <div>
      
        {user_id ? <SpecialNavbar /> : <RootNavbar />}
        
        <main>
          {children}
        </main>

    </div>
  );
};

export default AppLayout;
