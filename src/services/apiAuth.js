import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error("The login data could not be loaded from the database!!");
  }

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error);

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error);
}

export async function signup({ email, password, fullName, avatar }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName,
        avatar: avatar,
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  let updatedUser = "";
  if (password) updatedUser = { password };
  if (fullName) updatedUser = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedUser);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  if (avatar) {
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { errorAvatar } = await supabase.storage

      .from("avatars")
      .upload(fileName, avatar);

    if (errorAvatar) {
      console.error(errorAvatar.message);
      throw new Error(errorAvatar.message);
    }

    const { data: updatedData } = await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

    return updatedData;
  }
  return data;
}

export async function updatePassword({ email }) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}
