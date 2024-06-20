import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
function Settings() {
  return (
    <>
      <Row>
        <Heading as="h1">Update hotel settings</Heading>
      </Row>
      <Row type="vertical">
        <UpdateSettingsForm />
      </Row>
    </>
  );
}

export default Settings;
