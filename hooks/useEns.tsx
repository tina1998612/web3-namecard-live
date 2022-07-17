import { useProvider, useEnsName, useAccount } from "wagmi";
import { useEffect, useState } from "react";

const useEns = (_addr?: string, _ens?: string) => {
  const { address } = useAccount();
  const [_address, setFinalAddr] = useState('');
  const provider = useProvider();
  const [ensData, setEnsData] = useState({});
  const { data, isError, isLoading } = useEnsName({
    address: _address,
  });
  useEffect(() => {
    setFinalAddr(_addr || address || '');
  }, [_addr, address])

  async function getAndSetEnsData(_ensName?: string) {

    console.log('getAndSetEnsData', _ensName);

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
    if (_address && (data || _ens)) {
      getAndSetEnsData(data || _ens);
      console.log(ensData);
    }
  }, [_address, _ens]);

  return { ensData };
};

export default useEns;
