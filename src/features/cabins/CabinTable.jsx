import { useSearchParams } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabin } from './useCabin';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';

const CabinTable = () => {
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='cabins' />;
  //  1. Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabin;

  if (filterValue === 'all') filteredCabin = cabins;
  if (filterValue === 'no-discount')
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort by
  const sortByValue = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortByValue.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabin = filteredCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabin}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
};

export default CabinTable;
