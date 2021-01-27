import { BadgeAppearance, BadgeScale, BadgeVariant } from "../components/Badge";
import { ButtonScale, ButtonVariant } from "../components/Button";
import { CheckboxVariant } from "../components/Form/Checkbox/Checkbox";
import { InputSize } from "../components/Form/Input";
import { RadioVariant } from "../components/Form/Radio/Radio";
import { LinkVariant } from "../components/Link";

export type BadgeTheme = {
  base: {
    [key in BadgeScale]: string;
  };
  variant: {
    [key in BadgeAppearance]: {
      [key in BadgeVariant]: string;
    };
  };
};

export type ButtonTheme = {
  base: string;
  block: string;
  variant: { [key in ButtonVariant]: string };
  container: { [key in ButtonVariant]: string };
  loader: { [key in ButtonVariant]: string };
  scale: { [key in ButtonScale]: string };
  icon: {
    [key in ButtonScale]: { leading: string; trailing: string; only: string };
  };
};

export type LinkTheme = {
  [key in LinkVariant]: string;
};

export type FormEntry = {
  title: string;
  description: string;
  container: string;
};

export type InputTheme = {
  base: string;
  size: { [key in InputSize]: string };
  status: {
    default: string;
    error: string;
  };
  label: {
    base: string;
    able: string;
    disabled: string;
  };
  description: string;
  icon: {
    error: string;
  };
  help: {
    default: string;
    error: string;
  };
};

export type TextareaTheme = {
  base: string;

  status: {
    default: string;
    error: string;
  };
  label: {
    base: string;
    able: string;
    disabled: string;
  };

  icon: {
    error: string;
  };
  help: {
    default: string;
    error: string;
  };
};

export type CheckboxTheme = {
  base: string;
  variant: {
    container: {
      [key in CheckboxVariant]: string;
    };
    input: {
      [key in CheckboxVariant]: string;
    };
    state: {
      [key in CheckboxVariant]: {
        checked: string;
        unchecked: string;
      };
    };
  };
  group: {
    title: string;
    description: string;
    layout: {
      col: string;
      row: string;
    };
    help: {
      default: string;
      error: string;
    };
  };
  status: {
    default: string;
    error: string;
  };
  label: {
    base: string;
    able: string;
    disabled: string;
  };
  help: {
    default: string;
    error: string;
  };
};

export type RadioTheme = {
  base: string;
  variant: {
    container: {
      [key in RadioVariant]: string;
    };
    input: {
      [key in RadioVariant]: string;
    };
    state: {
      [key in RadioVariant]: {
        checked: string;
        unchecked: string;
      };
    };
  };
  group: {
    title: string;
    description: string;
    layout: {
      col: string;
      row: string;
    };
    help: {
      default: string;
      error: string;
    };
  };
  status: {
    default: string;
    error: string;
  };
  label: {
    base: string;
    able: string;
    disabled: string;
  };
  help: {
    default: string;
    error: string;
  };
};

export type SelectTheme = {
  base: string;
  status: {
    default: string;
    error: string;
  };
  label: {
    base: string;
    able: string;
    disabled: string;
  };
  item: {
    base: string;
    selected: string;
  };
  description: string;
  icon: {
    error: string;
  };
  help: {
    default: string;
    error: string;
  };
};

export type FormTheme = {
  checkbox: CheckboxTheme;
  entry: FormEntry;
  input: InputTheme;
  radio: RadioTheme;
  select: SelectTheme;
  textarea: TextareaTheme;
};

export type ContainerTheme = {
  base: string;
  narrow: string;
};

export type LayoutTheme = {
  container: ContainerTheme;
};

export type HeaderTheme = {
  header: string;
  description: string;
};

export type ListTheme = {
  base: string;
  item: string;
};

export type TypographyTheme = {
  h1: HeaderTheme;
  h2: HeaderTheme;
  h3: HeaderTheme;
  h4: HeaderTheme;
  h5: HeaderTheme;
  h6: HeaderTheme;
  p: string;
  span: string;
  ul: ListTheme;
  ol: ListTheme;
  base: string;
};

export type Theme = {
  badge: BadgeTheme;
  button: ButtonTheme;
  form: FormTheme;
  layout: LayoutTheme;
  link: LinkTheme;
  typography: TypographyTheme;
};
