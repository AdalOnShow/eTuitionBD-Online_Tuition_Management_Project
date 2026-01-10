import Select from 'react-select';
import { subjectOptions } from '../../data/subjectOptions';

const SubjectMultiSelect = ({ value, onChange, error }) => {

  const selectedOptions = subjectOptions.filter((opt) =>
    value?.includes(opt.value)
  );

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">
          Subject Specialization
        </span>
      </label>

      <Select
        isMulti
        options={subjectOptions}
        value={selectedOptions}
        onChange={(selected) => {
          const values = selected ? selected.map((opt) => opt.value) : [];
          onChange(values);
        }}
        placeholder="Select one or more subjects"
        className="react-select-container"
        classNamePrefix="react-select"
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
};

export default SubjectMultiSelect;
