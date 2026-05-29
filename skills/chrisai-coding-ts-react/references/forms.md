# Forms

Use this reference when a React task involves inputs, local mirrors of external
state, validation timing, or controlled versus uncontrolled behavior.

## Choose Controlled When

- the parent already owns the source of truth
- validation or submission logic depends on the latest value upstream
- several fields need coordinated state
- outside events can change the field after initial render

## Choose Uncontrolled When

- the field only needs an initial value
- the parent does not need every keystroke
- the UI is simpler with DOM-managed state
- a lightweight wrapper around native behavior is enough

## Sync Rules

- Initialize uncontrolled state from `defaultValue`, not `value`.
- Mirror `value` into local state only when the component intentionally supports
  controlled usage.
- Keep the sync path explicit so resets and external updates are easy to trace.
- Do not maintain duplicate state unless it serves a real UX purpose.

## Validation Placement

- Put display-only validation near the field when it is purely local.
- Lift validation when submit behavior or sibling fields depend on it.
- Prefer derived error state over storing multiple redundant flags.

## Review Questions

- Is there one clear source of truth?
- Does the component support both control modes only when needed?
- Will resets, async updates, and parent-driven changes behave predictably?
- Is field logic still easy to scan from props through render?

## Concrete Pattern

```tsx
type SearchFieldProps = {
  defaultValue?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  value?: string
};

function useSearchField(config: SearchFieldProps) {
  //read the field contract first so the hook can support both control modes
  const { defaultValue, onChange, value } = config;

  //start from the default value so uncontrolled usage has local state
  const [ current, setCurrent ] = useState(defaultValue ?? '');

  //update the local mirror first, then forward the browser event upstream
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrent(event.target.value || '');

    if (onChange) {
      onChange(event);
    }
  };

  //when the parent controls the field, keep the local mirror synchronized
  useEffect(() => {
    if (typeof value === 'string') {
      setCurrent(value);
    }
  }, [ value ]);

  return { current, handleChange };
}
```
