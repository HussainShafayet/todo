export const getStatusColor = (status) => {
  switch (status) {
    case 'New':
      return 'border-blue-500';
    case 'Ongoing':
      return 'border-orange-500';
    case 'Done':
      return 'border-green-500';
    default:
      return 'border-gray-300';
  }
};

export const getNextStatusOptions = (status) => {
  switch (status) {
    case 'New':
      return ['Ongoing', 'Done'];
    case 'Ongoing':
      return ['New', 'Done'];
    case 'Done':
      return ['New', 'Ongoing'];
    default:
      return [];
  }
};
