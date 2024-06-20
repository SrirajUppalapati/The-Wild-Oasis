import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("The cabin data could not be loaded from the database!!");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("The cabin could not be deleted from the database!!");
  }

  return data;
}

export async function createCabin(cabin) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  // https://zqldjloezipvabunszsw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const path = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: path }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("The cabin could not be added to the database!!");
  }

  if (hasImagePath) return data;

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(imageError);
    throw new Error("The cabin image could not be added to the database!!");
  }

  return data;
}

export async function updateCabin(id, updateData) {
  const hasImagePath = updateData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${updateData.image.name}`.replaceAll(
    "/",
    ""
  );

  const path = hasImagePath
    ? updateData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...updateData, image: path })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("The cabin could not be updated in the database!!");
  }

  if (hasImagePath) return data;

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, updateData.image);

  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(imageError);
    throw new Error("The cabin image could not be added to the database!!");
  }

  return data;
}
