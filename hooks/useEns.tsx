import { useProvider, useEnsName, useAccount } from "wagmi";
import { useEffect, useState } from "react";

const useEns = (_addr?: string) => {
  const { address } = useAccount();
  const _address = _addr || address;
  const provider = useProvider();
  const [ensData, setEnsData] = useState({});
  const { data, isError, isLoading } = useEnsName({
    address: _address,
  });

  async function getAndSetEnsData(_ensName: string) {
    const resolver = await provider.getResolver(_ensName);
    if (!resolver) {
      console.log("ens name not found");
      return;
    }
    const email = await resolver.getText("email");
    const twitter = await resolver.getText("com.twitter");
    const github = await resolver.getText("com.github");
    const avatarUrl = await resolver.getText("avatar");
    const websiteUrl = await resolver.getText("url");

    setEnsData({
      ensName: _ensName,
      email,
      twitter,
      github,
      avatarUrl,
      websiteUrl,
    });
  }

  // console.log(_address);
  useEffect(() => {
    if (_address && data) {
      getAndSetEnsData(data);
      console.log(ensData);
    }
  }, [_address]);

  return { ensData };
};

export default useEns;
